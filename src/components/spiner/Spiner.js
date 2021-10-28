export const Spiner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "none",
      }}
      width={124}
      height={124}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
    >
      <g transform="translate(80 50)">
        <circle r={6} fill="#ec1d24">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-1.346153846153846s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="-1.346153846153846s"
          />
        </circle>
      </g>
      <g transform="rotate(45 -50.355 121.569)">
        <circle r={6} fill="#ec1d24" fillOpacity={0.875}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-1.1538461538461537s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="-1.1538461538461537s"
          />
        </circle>
      </g>
      <g transform="rotate(90 -15 65)">
        <circle r={6} fill="#ec1d24" fillOpacity={0.75}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.9615384615384615s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.9615384615384615s"
          />
        </circle>
      </g>
      <g transform="rotate(135 -.355 41.569)">
        <circle r={6} fill="#ec1d24" fillOpacity={0.625}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.7692307692307692s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.7692307692307692s"
          />
        </circle>
      </g>
      <g transform="rotate(180 10 25)">
        <circle r={6} fill="#ec1d24" fillOpacity={0.5}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.5769230769230769s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.5769230769230769s"
          />
        </circle>
      </g>
      <g transform="rotate(-135 20.355 8.431)">
        <circle r={6} fill="#ec1d24" fillOpacity={0.375}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.3846153846153846s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.3846153846153846s"
          />
        </circle>
      </g>
      <g transform="rotate(-90 35 -15)">
        <circle r={6} fill="#ec1d24" fillOpacity={0.25}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.1923076923076923s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="-0.1923076923076923s"
          />
        </circle>
      </g>
      <g transform="rotate(-45 70.355 -71.569)">
        <circle r={6} fill="#ec1d24" fillOpacity={0.125}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="0s"
            values="1.5 1.5;1 1"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            keyTimes="0;1"
            dur="1.5384615384615383s"
            repeatCount="indefinite"
            values="1;0"
            begin="0s"
          />
        </circle>
      </g>
    </svg>
  )
}
