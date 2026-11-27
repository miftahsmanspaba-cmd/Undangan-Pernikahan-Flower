export function FloralCornerCluster({
  position = 'top-left',
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) {
  const posClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 -scale-x-100',
    'bottom-left': 'bottom-0 left-0 -scale-y-100',
    'bottom-right': 'bottom-0 right-0 -scale-x-100 -scale-y-100',
  }[position];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 180"
      className={`absolute ${posClasses} w-36 h-36 sm:w-44 sm:h-44 pointer-events-none opacity-80`}
      fill="none"
    >
      {/* Soft sage botanical leaves */}
      <path
        d="M8 90 C28 72, 46 68, 68 78 C46 92, 26 96, 8 90 Z"
        fill="#89AC8F"
        opacity="0.7"
      />
      <path
        d="M52 16 C72 34, 78 52, 66 72 C52 52, 46 34, 52 16 Z"
        fill="#7EA084"
        opacity="0.7"
      />
      <path
        d="M14 132 C34 114, 52 110, 68 118 C52 132, 32 136, 14 132 Z"
        fill="#9BBBA0"
        opacity="0.65"
      />
      {/* Blush pink rose */}
      <circle cx="32" cy="34" r="18" fill="#F2BAC9" />
      <circle cx="24" cy="28" r="10" fill="#E89DB2" />
      <circle cx="40" cy="28" r="10" fill="#E89DB2" />
      <circle cx="32" cy="40" r="10" fill="#E89DB2" />
      <circle cx="32" cy="33" r="6" fill="#D97C98" />
      <circle cx="32" cy="33" r="2.5" fill="#F6D98D" />

      {/* Dusty blue hydrangea cluster */}
      <circle cx="72" cy="24" r="12" fill="#9BB5D6" />
      <circle cx="65" cy="18" r="6" fill="#B8CBE3" />
      <circle cx="78" cy="18" r="6" fill="#B8CBE3" />
      <circle cx="72" cy="29" r="6" fill="#7D9BC4" />
      <circle cx="72" cy="23" r="2.5" fill="#F6D98D" />

      {/* Secondary small pink blossom */}
      <circle cx="22" cy="72" r="11" fill="#F5CCD7" />
      <circle cx="22" cy="72" r="5" fill="#E393AA" />
      <circle cx="22" cy="72" r="2" fill="#F6D98D" />

      {/* Tiny golden accent buds */}
      <circle cx="96" cy="14" r="3" fill="#E5C072" />
      <circle cx="16" cy="104" r="3" fill="#E5C072" />
      <circle cx="54" cy="60" r="3.5" fill="#B8CBE3" />
    </svg>
  );
}
