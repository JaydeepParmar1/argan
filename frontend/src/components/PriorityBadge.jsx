export default function PriorityBadge({ priority }) {
  // Matches rubric: Red = High, Yellow = Medium, Green = Low
  const badgeClass = priority === 'High' ? 'danger' : priority === 'Medium' ? 'warning text-dark' : 'success';
  
  return (
    <span className={`badge bg-${badgeClass}`}>
      {priority}
    </span>
  );
}