'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { TrustVectorEntity } from '@/framework/schema/types';

interface TrustVectorChartProps {
  entity: TrustVectorEntity;
  height?: number;
}

export function TrustVectorChart({ entity, height = 400 }: TrustVectorChartProps) {
  const { trust_vector } = entity;

  const data = [
    {
      dimension: 'Performance',
      score: trust_vector.performance_reliability.overall_score,
      fullName: 'Performance & Reliability',
    },
    {
      dimension: 'Security',
      score: trust_vector.security.overall_score,
      fullName: 'Security',
    },
    {
      dimension: 'Privacy',
      score: trust_vector.privacy_compliance.overall_score,
      fullName: 'Privacy & Compliance',
    },
    {
      dimension: 'Trust',
      score: trust_vector.trust_transparency.overall_score,
      fullName: 'Trust & Transparency',
    },
    {
      dimension: 'Operations',
      score: trust_vector.operational_excellence.overall_score,
      fullName: 'Operational Excellence',
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fill: '#6b7280', fontSize: 14 }}
        />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 12 }} />
        <Radar
          name={entity.name}
          dataKey="score"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-card border rounded-lg shadow-lg p-3">
                  <p className="font-semibold mb-1">{data.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    Score: <span className="font-bold text-primary">{data.score}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
