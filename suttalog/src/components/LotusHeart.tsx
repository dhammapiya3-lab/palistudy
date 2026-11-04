// 연꽃 하트 컴포넌트 — emoji 대신 SVG 이미지 사용
// 어느 OS에서나 동일한 핑크 연꽃으로 표시됨

interface LotusHeartProps {
  active: boolean
  shake?: boolean
  delay?: number
  size?: number
}

export default function LotusHeart({ active, shake, delay = 0, size = 26 }: LotusHeartProps) {
  return (
    <span
      className={`inline-block transition-all duration-300
        ${active ? 'heart-pulse' : 'opacity-20 grayscale scale-75'}
        ${shake ? 'heart-shake' : ''}`}
      style={{ animationDelay: active ? `${delay}s` : undefined }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 40 40"
        style={{ display: 'block' }}
      >
        {/* 뒷면 꽃잎 — 진한 핑크 */}
        <ellipse cx="20" cy="29" rx="6.5" ry="10.5" fill="#C2185B"
          transform="rotate(-55 20 29)" opacity="0.7"/>
        <ellipse cx="20" cy="29" rx="6.5" ry="10.5" fill="#C2185B"
          transform="rotate(55 20 29)" opacity="0.7"/>
        {/* 중간 꽃잎 */}
        <ellipse cx="20" cy="27" rx="6" ry="11.5" fill="#E91E8C"
          transform="rotate(-28 20 27)" opacity="0.85"/>
        <ellipse cx="20" cy="27" rx="6" ry="11.5" fill="#E91E8C"
          transform="rotate(28 20 27)" opacity="0.85"/>
        {/* 앞면 꽃잎 — 밝은 핑크 */}
        <ellipse cx="20" cy="25" rx="5.5" ry="13" fill="#F06292"/>
        <ellipse cx="20" cy="26" rx="5" ry="12" fill="#EC407A"
          transform="rotate(-14 20 26)"/>
        <ellipse cx="20" cy="26" rx="5" ry="12" fill="#EC407A"
          transform="rotate(14 20 26)"/>
        {/* 꽃잎 하이라이트 (밝은 부분) */}
        <ellipse cx="20" cy="24" rx="3" ry="8" fill="#F8BBD0" opacity="0.55"/>
        {/* 꽃술 */}
        <circle cx="20" cy="19.5" r="4.2" fill="#FDD835"/>
        <circle cx="20" cy="19.5" r="2.8" fill="#F9A825"/>
        <circle cx="19.2" cy="18.8" r="1.2" fill="#FFF9C4" opacity="0.9"/>
      </svg>
    </span>
  )
}
