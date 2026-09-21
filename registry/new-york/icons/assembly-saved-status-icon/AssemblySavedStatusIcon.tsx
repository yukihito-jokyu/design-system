// 承認済みのSVG。編集する原本はこのTSX。
import { IconFrame, type IconProps } from "@/registry/new-york/icons/icon-frame/IconFrame";

export function AssemblySavedStatusIcon({ size = 20, ...props }: IconProps) {
  return (
    <IconFrame {...props} size={size}>
      <g transform="translate(4.000 11.652) scale(1.913043)">
        <g transform="scale(0.25)">
          <path
            d="M52 126C44.8 118.5 41.8 116.1 39.5 115.8C37 115.6 36.4 115 36.2 112.6C35.9 110.5 34 107.9 29.9 103.9C26 100.1 24 97.4 24 95.9C24 94.4 22.5 92.2 20 90C15.5 86 14.6 81.8 18 80C19.2 79.4 20 77.9 20 76.4C20 71 29 64 36 64L42 64 53 74.9C60.9 82.8 63.9 86.6 64.2 88.7C64.4 90.9 65.1 91.6 67.2 91.8C70.8 92.2 87.7 75.8 88.2 71.3C88.5 68.9 89 68.4 92 68C95 67.6 95.5 67.1 95.8 64.7C96.1 62.5 101.5 56.5 119.1 38.9L142 16 152.1 16C165.9 16 168 17.8 168 30L168 38.1 158 48C151.7 54.2 148 58.6 148 59.9C148 61.3 135.9 74.1 111 99L74 136 67.8 135.9L61.5 135.9 52 126Z"
            fillRule="evenodd"
            fill="#fefbf8"
            stroke="#fefbf8"
            strokeWidth=".6"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </IconFrame>
  );
}
