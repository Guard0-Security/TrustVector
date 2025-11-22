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
    >
      <span>{score}</span>
      {showLabel && (
        <>
          <span className="mx-1">·</span>
          <span>{labels[interpretation]}</span>
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

  // Use more subtle styling for scores
  const getBarColorClass = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-orange-500'; // Softer than red
  };

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showValue && <span className="font-semibold text-muted-foreground">{score}</span>}
        </div>
      )}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', getBarColorClass(score))}
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}
