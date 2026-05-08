// Inline SVG components — used to be loaded via `<img src="/components/Input/assets/*.svg" />`
// pointing to public-folder assets, which broke when the library was packaged for npm.
// Inlining the SVG markup keeps the component self-contained and bundler-agnostic.
import type { SVGProps } from 'react';

export function FlagBaseSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      {...props}
    >
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#F0F0F0"
      />
    </svg>
  );
}

export function FlagGroupSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox="0 0 23.1732 23.1732"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      {...props}
    >
      <g>
        <path d="M2.06723 4.28077C1.12462 5.50716 0.413859 6.92067 0 8.45625H6.24272L2.06723 4.28077Z" fill="#0052B4" />
        <path d="M23.1732 8.45625C22.7594 6.92072 22.0485 5.5072 21.106 4.28081L16.9306 8.45625H23.1732Z" fill="#0052B4" />
        <path d="M0 14.7171C0.413906 16.2526 1.12467 17.6662 2.06723 18.8925L6.24258 14.7171H0Z" fill="#0052B4" />
        <path d="M18.8925 2.06728C17.6661 1.12467 16.2526 0.413906 14.717 0V6.24267L18.8925 2.06728Z" fill="#0052B4" />
        <path d="M4.28077 21.1059C5.50716 22.0485 6.92067 22.7593 8.4562 23.1732V16.9306L4.28077 21.1059Z" fill="#0052B4" />
        <path d="M8.45616 0C6.92062 0.413906 5.50711 1.12467 4.28077 2.06723L8.45616 6.24262V0Z" fill="#0052B4" />
        <path d="M14.7171 23.1732C16.2526 22.7593 17.6661 22.0485 18.8925 21.106L14.7171 16.9306V23.1732Z" fill="#0052B4" />
        <path d="M16.9306 14.7171L21.106 18.8925C22.0485 17.6662 22.7594 16.2526 23.1732 14.7171H16.9306Z" fill="#0052B4" />
      </g>
    </svg>
  );
}

export function FlagOverlaySvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      overflow="visible"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      {...props}
    >
      <g>
        <path
          d="M23.8984 10.4348H13.5653H13.5652V0.101578C13.0529 0.034875 12.5305 0 12 0C11.4694 0 10.9471 0.034875 10.4348 0.101578V10.4347V10.4348H0.101578C0.034875 10.9471 0 11.4695 0 12C0 12.5306 0.034875 13.0529 0.101578 13.5652H10.4347H10.4348V23.8984C10.9471 23.9651 11.4694 24 12 24C12.5305 24 13.0529 23.9652 13.5652 23.8984V13.5653V13.5652H23.8984C23.9651 13.0529 24 12.5306 24 12C24 11.4695 23.9651 10.9471 23.8984 10.4348V10.4348Z"
          fill="#D80027"
        />
        <path
          d="M15.1305 15.1305L20.4853 20.4853C20.7315 20.2391 20.9665 19.9817 21.1906 19.7149L16.6062 15.1305H15.1305V15.1305Z"
          fill="#D80027"
        />
        <path
          d="M8.86955 15.1305H8.86945L3.51469 20.4853C3.76088 20.7315 4.01827 20.9665 4.28508 21.1906L8.86955 16.6061V15.1305Z"
          fill="#D80027"
        />
        <path
          d="M8.86955 8.86964V8.86955L3.51473 3.51469C3.26845 3.76088 3.03352 4.01827 2.80936 4.28508L7.39387 8.86959H8.86955V8.86964Z"
          fill="#D80027"
        />
        <path
          d="M15.1305 8.86964L20.4853 3.51473C20.2391 3.26845 19.9817 3.03352 19.7149 2.80941L15.1305 7.39392V8.86964Z"
          fill="#D80027"
        />
      </g>
    </svg>
  );
}
