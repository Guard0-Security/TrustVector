'use client';

import { useState } from 'react';
import type {
  TrustVectorEntity,
  DimensionScore,
  CriterionScore,
} from '@/framework/schema/types';
import { calculateOverallScore, interpretScore, getScoreColor } from '@/framework/schema/types';

interface ExportPDFButtonProps {
  entity: TrustVectorEntity;
}

export function ExportPDFButton({ entity }: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const { jsPDF } = await import('jspdf');

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = margin;

      // Colors
      const colors = {
        background: [10, 10, 10] as [number, number, number],
        green: [134, 239, 172] as [number, number, number],
        cyan: [34, 211, 238] as [number, number, number],
        yellow: [250, 204, 21] as [number, number, number],
        white: [255, 255, 255] as [number, number, number],
        gray: [156, 163, 175] as [number, number, number],
        darkGray: [31, 41, 55] as [number, number, number],
      };

      // Helper to add a new page if needed
      const checkNewPage = (neededSpace: number) => {
        if (y + neededSpace > pageHeight - margin) {
          doc.addPage();
          // Draw background on new page
          doc.setFillColor(...colors.background);
          doc.rect(0, 0, pageWidth, pageHeight, 'F');
          y = margin;
          return true;
        }
        return false;
      };

      // Draw background
      doc.setFillColor(...colors.background);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // === HEADER SECTION ===
      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(...colors.green);
      doc.text(entity.name.toUpperCase(), margin, y + 8);
      y += 12;

      // Provider
      doc.setFontSize(14);
      doc.setTextColor(...colors.cyan);
      doc.text(`[${entity.provider.toUpperCase()}]`, margin, y + 4);
      y += 10;

      // Overall Score Badge
      const overallScore = calculateOverallScore(entity);
      const interpretation = interpretScore(overallScore);
      const scoreColor = hexToRgb(getScoreColor(overallScore));

      doc.setFillColor(...scoreColor);
      doc.roundedRect(margin, y, 50, 12, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...colors.background);
      doc.text(`${overallScore} - ${interpretation.charAt(0).toUpperCase() + interpretation.slice(1)}`, margin + 25, y + 8, { align: 'center' });
      y += 18;

      // Description
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...colors.gray);
      const descLines = doc.splitTextToSize(entity.description, contentWidth);
      doc.text(descLines, margin, y);
      y += descLines.length * 5 + 5;

      // Tags
      if (entity.tags && entity.tags.length > 0) {
        doc.setFontSize(8);
        doc.setTextColor(...colors.green);
        const tagsText = entity.tags.map((t) => `#${t.toUpperCase()}`).join('  ');
        const tagLines = doc.splitTextToSize(tagsText, contentWidth);
        doc.text(tagLines, margin, y);
        y += tagLines.length * 4 + 3;
      }

      // Version & Last Evaluated
      doc.setFontSize(9);
      doc.setTextColor(...colors.gray);
      doc.text(`Version: ${entity.version}  |  Last Evaluated: ${formatDate(entity.last_evaluated)}`, margin, y);
      y += 10;

      // Divider
      drawDivider(doc, margin, y, contentWidth, colors.green);
      y += 8;

      // === TRUST VECTOR SUMMARY ===
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...colors.green);
      doc.text('TRUST VECTOR SUMMARY', margin, y);
      y += 8;

      const dimensions = [
        { key: 'performance_reliability', name: 'Performance & Reliability', data: entity.trust_vector.performance_reliability },
        { key: 'security', name: 'Security', data: entity.trust_vector.security },
        { key: 'privacy_compliance', name: 'Privacy & Compliance', data: entity.trust_vector.privacy_compliance },
        { key: 'trust_transparency', name: 'Trust & Transparency', data: entity.trust_vector.trust_transparency },
        { key: 'operational_excellence', name: 'Operational Excellence', data: entity.trust_vector.operational_excellence },
      ];

      // Draw dimension scores as bars
      for (const dim of dimensions) {
        checkNewPage(12);
        drawScoreBar(doc, margin, y, contentWidth, dim.name, dim.data.overall_score, colors);
        y += 10;
      }
      y += 5;

      // === STRENGTHS & LIMITATIONS ===
      checkNewPage(40);
      drawDivider(doc, margin, y, contentWidth, colors.green);
      y += 8;

      // Two columns for strengths and limitations
      const colWidth = (contentWidth - 10) / 2;

      // Strengths
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...colors.green);
      doc.text('STRENGTHS', margin, y);

      // Limitations
      doc.setTextColor(...colors.yellow);
      doc.text('LIMITATIONS', margin + colWidth + 10, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);

      const maxItems = Math.max(entity.strengths.length, entity.limitations.length);
      for (let i = 0; i < maxItems; i++) {
        checkNewPage(8);

        if (entity.strengths[i]) {
          doc.setTextColor(...colors.green);
          doc.text('+', margin, y);
          doc.setTextColor(...colors.white);
          const sLines = doc.splitTextToSize(entity.strengths[i], colWidth - 8);
          doc.text(sLines, margin + 5, y);
        }

        if (entity.limitations[i]) {
          doc.setTextColor(...colors.yellow);
          doc.text('!', margin + colWidth + 10, y);
          doc.setTextColor(...colors.white);
          const lLines = doc.splitTextToSize(entity.limitations[i], colWidth - 8);
          doc.text(lLines, margin + colWidth + 15, y);
        }

        y += 8;
      }
      y += 5;

      // === DETAILED DIMENSION SCORES ===
      for (const dim of dimensions) {
        checkNewPage(30);
        drawDivider(doc, margin, y, contentWidth, colors.green);
        y += 8;

        // Dimension header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...colors.green);
        doc.text(dim.name.toUpperCase(), margin, y);

        // Dimension score badge
        const dimScoreColor = hexToRgb(getScoreColor(dim.data.overall_score));
        doc.setFillColor(...dimScoreColor);
        doc.roundedRect(pageWidth - margin - 20, y - 5, 20, 8, 1, 1, 'F');
        doc.setFontSize(10);
        doc.setTextColor(...colors.background);
        doc.text(String(dim.data.overall_score), pageWidth - margin - 10, y, { align: 'center' });
        y += 8;

        // Dimension notes
        if (dim.data.notes) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(...colors.gray);
          const noteLines = doc.splitTextToSize(dim.data.notes, contentWidth);
          doc.text(noteLines, margin, y);
          y += noteLines.length * 4 + 4;
        }

        // Criteria
        for (const [criterionKey, criterion] of Object.entries(dim.data.criteria)) {
          checkNewPage(25);
          drawCriterion(doc, margin, y, contentWidth, criterionKey, criterion, colors);
          y += 20;
        }
      }

      // === USE CASE RATINGS ===
      if (entity.use_case_ratings && Object.keys(entity.use_case_ratings).length > 0) {
        checkNewPage(30);
        drawDivider(doc, margin, y, contentWidth, colors.green);
        y += 8;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...colors.green);
        doc.text('USE CASE RATINGS', margin, y);
        y += 8;

        for (const [useCase, rating] of Object.entries(entity.use_case_ratings)) {
          checkNewPage(15);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(...colors.white);
          doc.text(formatUseCaseName(useCase), margin, y);

          // Score badge
          const ucScoreColor = hexToRgb(getScoreColor(rating.overall));
          doc.setFillColor(...ucScoreColor);
          doc.roundedRect(margin + 60, y - 4, 15, 6, 1, 1, 'F');
          doc.setFontSize(8);
          doc.setTextColor(...colors.background);
          doc.text(String(rating.overall), margin + 67.5, y, { align: 'center' });
          y += 5;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(...colors.gray);
          const notesLines = doc.splitTextToSize(rating.notes, contentWidth);
          doc.text(notesLines, margin, y);
          y += notesLines.length * 3.5 + 4;
        }
      }

      // === METADATA ===
      if (entity.metadata && Object.keys(entity.metadata).length > 0) {
        checkNewPage(30);
        drawDivider(doc, margin, y, contentWidth, colors.cyan);
        y += 8;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...colors.cyan);
        doc.text('METADATA', margin, y);
        y += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);

        for (const [key, value] of Object.entries(entity.metadata)) {
          if (value === undefined || value === null) continue;
          checkNewPage(10);

          doc.setTextColor(...colors.cyan);
          doc.text(`${formatKey(key)}:`, margin, y);

          doc.setTextColor(...colors.white);
          const valueStr = formatMetadataValue(value);
          const valueLines = doc.splitTextToSize(valueStr, contentWidth - 50);
          doc.text(valueLines, margin + 45, y);
          y += Math.max(valueLines.length * 4, 5);
        }
      }

      // === FOOTER ===
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...colors.gray);
        doc.text(
          `TrustVector Report - ${entity.name} - Page ${i} of ${totalPages}`,
          pageWidth / 2,
          pageHeight - 8,
          { align: 'center' }
        );
        doc.text(
          `Generated: ${new Date().toISOString().split('T')[0]}`,
          pageWidth - margin,
          pageHeight - 8,
          { align: 'right' }
        );
      }

      // Save
      doc.save(`${entity.name} Trust Report.pdf`);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      data-export-button
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
                 bg-green-950/60 text-green-400 border-2 border-green-500/40 rounded-lg
                 hover:bg-green-950/80 hover:border-green-400/60 hover:text-green-300
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 tracking-wide uppercase
                 shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.2)]"
      aria-label={`Export ${entity.name} trust report as PDF`}
    >
      {isExporting ? (
        <>
          <span className="animate-pulse">&#8635;</span>
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span>Export PDF</span>
        </>
      )}
    </button>
  );
}

// Helper functions

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [134, 239, 172];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatUseCaseName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatMetadataValue(value: unknown): string {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return Object.entries(value)
      .map(([k, v]) => `${formatKey(k)}: ${v}`)
      .join(', ');
  }
  return String(value);
}

function drawDivider(
  doc: InstanceType<typeof import('jspdf').jsPDF>,
  x: number,
  y: number,
  width: number,
  color: [number, number, number]
) {
  doc.setDrawColor(...color);
  doc.setLineWidth(0.5);
  doc.line(x, y, x + width, y);
}

function drawScoreBar(
  doc: InstanceType<typeof import('jspdf').jsPDF>,
  x: number,
  y: number,
  width: number,
  label: string,
  score: number,
  colors: Record<string, [number, number, number]>
) {
  const barWidth = width - 80;
  const barHeight = 5;

  // Label
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...colors.white);
  doc.text(label, x, y + 4);

  // Background bar
  doc.setFillColor(...colors.darkGray);
  doc.roundedRect(x + 65, y, barWidth, barHeight, 1, 1, 'F');

  // Score bar
  const scoreColor = hexToRgb(getScoreColor(score));
  const scoreWidth = (score / 100) * barWidth;
  doc.setFillColor(...scoreColor);
  doc.roundedRect(x + 65, y, scoreWidth, barHeight, 1, 1, 'F');

  // Score text
  doc.setFontSize(9);
  doc.setTextColor(...scoreColor);
  doc.text(String(score), x + 70 + barWidth, y + 4);
}

function drawCriterion(
  doc: InstanceType<typeof import('jspdf').jsPDF>,
  x: number,
  y: number,
  width: number,
  key: string,
  criterion: CriterionScore,
  colors: Record<string, [number, number, number]>
) {
  const name = formatKey(key);

  // Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...colors.white);
  doc.text(name, x, y);

  // Score or value
  if (criterion.score !== undefined) {
    const scoreColor = hexToRgb(getScoreColor(criterion.score));
    doc.setFillColor(...scoreColor);
    doc.roundedRect(x + width - 20, y - 4, 18, 6, 1, 1, 'F');
    doc.setFontSize(8);
    doc.setTextColor(...colors.background);
    doc.text(String(criterion.score), x + width - 11, y, { align: 'center' });
  } else if (criterion.value !== undefined) {
    doc.setFontSize(8);
    doc.setTextColor(...colors.cyan);
    doc.text(`Value: ${criterion.value}`, x + width - 40, y, { align: 'right' });
  }

  y += 5;

  // Methodology
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...colors.gray);
  const methodLines = doc.splitTextToSize(criterion.methodology, width - 25);
  doc.text(methodLines.slice(0, 2), x, y);
  y += methodLines.slice(0, 2).length * 3.5;

  // Confidence badge
  const confColor =
    criterion.confidence === 'high'
      ? colors.green
      : criterion.confidence === 'medium'
      ? colors.yellow
      : [239, 68, 68] as [number, number, number];
  doc.setFontSize(7);
  doc.setTextColor(...confColor);
  doc.text(`[${criterion.confidence.toUpperCase()}]`, x, y + 3);

  // Last verified
  doc.setTextColor(...colors.gray);
  doc.text(`Last verified: ${criterion.last_verified}`, x + 25, y + 3);
}
