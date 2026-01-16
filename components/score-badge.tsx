import { interpretScore, getScoreColor } from '@/framework/schema/types';
import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ScoreBadge({ score, size = 'md', showLabel = false, className }: ScoreBadgeProps) {
  const interpretation = interpretScore(score);
  const color = getScoreColor(score);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const labels = {
    exceptional: 'Exceptional',
    strong: 'Strong',
    adequate: 'Adequate',
    concerning: 'Concerning',
    poor: 'Poor',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-semibold',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}40`,
      }}
      role="status"
      aria-label={`Score: ${score} out of 100, rated as ${labels[interpretation]}`}
    >
      <span aria-hidden="true">{score}</span>
      {showLabel && (
        <>
          <span className="mx-1" aria-hidden="true">·</span>
          <span aria-hidden="true">{labels[interpretation]}</span>
        </>
      )}
    </div>
  );
}

interface ScoreBarProps {
  score: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ScoreBar({ score, label, showValue = true, className }: ScoreBarProps) {
  const color = getScoreColor(score);

  return (
    <div
      className={cn('space-y-1', className)}
      role="meter"
      aria-label={label ? `${label}: ${score} out of 100` : `Score: ${score} out of 100`}
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showValue && (
            <span className="font-semibold" style={{ color }}>
              {score}
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-gray-800/50 rounded-full overflow-hidden" aria-hidden="true">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${score}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}
