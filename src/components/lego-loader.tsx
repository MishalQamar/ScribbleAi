import React from 'react';

const LegoLoader: React.FC = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes brick-bounce {
          from,
          12%,
          15%,
          27%,
          30%,
          42%,
          45%,
          62%,
          65%,
          77%,
          80%,
          92%,
          95%,
          to {
            transform: translate(0, 0);
          }
          13.5%,
          28.5%,
          43.5%,
          63.5%,
          78.5%,
          93.5% {
            transform: translate(0, 6px);
          }
        }

        @keyframes brick-move-1 {
          from,
          4%,
          92%,
          to {
            transform: translate(0, 0);
          }
          12%,
          19%,
          77%,
          84% {
            transform: translate(17.5px, 10px);
          }
          27%,
          34%,
          62%,
          69% {
            transform: translate(35px, 20px);
          }
          42%,
          54% {
            transform: translate(52.5px, 30px);
          }
        }

        @keyframes brick-move-2 {
          from,
          92%,
          to {
            transform: translate(0, -47px);
          }
          4% {
            transform: translate(0, -87px);
          }
          8% {
            transform: translate(-35px, -87px);
          }
          12%,
          80% {
            transform: translate(-35px, -67px);
          }
          84% {
            transform: translate(-35px, -107px);
          }
          88% {
            transform: translate(0, -67px);
          }
        }

        @keyframes brick-move-3 {
          from,
          15%,
          77%,
          to {
            transform: translate(0, -47px);
          }
          19% {
            transform: translate(0, -87px);
          }
          23% {
            transform: translate(-35px, -87px);
          }
          27%,
          65% {
            transform: translate(-35px, -67px);
          }
          69% {
            transform: translate(-35px, -107px);
          }
          73% {
            transform: translate(0, -67px);
          }
        }

        @keyframes brick-move-4 {
          from,
          30%,
          62%,
          to {
            transform: translate(0, -47px);
          }
          34% {
            transform: translate(0, -87px);
          }
          38% {
            transform: translate(-35px, -87px);
          }
          42%,
          50% {
            transform: translate(-35px, -67px);
          }
          54% {
            transform: translate(-35px, -107px);
          }
          58% {
            transform: translate(0, -67px);
          }
        }

        .lego-brick-group {
          animation: brick-bounce 6s cubic-bezier(0.37, 0, 0.63, 1)
            infinite;
        }

        .lego-brick-group-1 {
          animation-name: brick-move-1;
        }

        .lego-brick-group-2 {
          animation-name: brick-move-2;
        }

        .lego-brick-group-3 {
          animation-name: brick-move-3;
        }

        .lego-brick-group-4 {
          animation-name: brick-move-4;
        }
      `}</style>

      <div className="flex items-center justify-center p-8">
        <svg
          className="w-32 h-32 md:w-40 md:h-40"
          viewBox="0 0 420 420"
          role="img"
          aria-label="Stack of four LEGO bricks jumping left one stud at a time, leaving one brick behind each jump so that it forms stairs. Then the reverse happens."
        >
          <defs>
            <symbol id="brick">
              <polygon
                fill="var(--brick-top)"
                points="70 0,140 39,70 125,0 39"
              />
              <polygon
                fill="var(--brick-left)"
                points="0 39,70 78,71 78,70 125,0 86"
              />
              <polygon
                fill="var(--brick-right)"
                points="70 78,140 39,140 86,70 125"
              />
              <use href="#studs" />
            </symbol>
            <symbol id="stud">
              <rect y="1" rx="14" ry="8" width="28" height="24" />
              <ellipse
                fill="var(--brick-top)"
                cx="14"
                cy="8"
                rx="14"
                ry="8"
              />
            </symbol>
            <symbol id="studs">
              <use href="#stud" transform="translate(21, 22)" />
              <use href="#stud" transform="translate(56, 3)" />
              <use href="#stud" transform="translate(56, 41)" />
              <use href="#stud" transform="translate(91, 22)" />
            </symbol>
          </defs>
          <g transform="translate(140, 218)">
            <g className="lego-brick-group">
              <g className="lego-brick-group lego-brick-group-1">
                <use
                  className="brick-blue"
                  href="#brick"
                  style={
                    {
                      '--brick-left': '#3b82f6',
                      '--brick-top': '#60a5fa',
                      '--brick-right': '#1d4ed8',
                      fill: '#1d4ed8',
                    } as React.CSSProperties
                  }
                />
                <g
                  className="lego-brick-group lego-brick-group-2"
                  transform="translate(0, -47)"
                >
                  <use
                    className="brick-green"
                    href="#brick"
                    style={
                      {
                        '--brick-left': '#22c55e',
                        '--brick-top': '#4ade80',
                        '--brick-right': '#16a34a',
                        fill: '#16a34a',
                      } as React.CSSProperties
                    }
                  />
                  <g
                    className="lego-brick-group lego-brick-group-3"
                    transform="translate(0, -47)"
                  >
                    <use
                      className="brick-orange"
                      href="#brick"
                      style={
                        {
                          '--brick-left': '#f97316',
                          '--brick-top': '#fb923c',
                          '--brick-right': '#ea580c',
                          fill: '#ea580c',
                        } as React.CSSProperties
                      }
                    />
                    <g
                      className="lego-brick-group lego-brick-group-4"
                      transform="translate(0, -47)"
                    >
                      <use
                        className="brick-red"
                        href="#brick"
                        style={
                          {
                            '--brick-left': '#ef4444',
                            '--brick-top': '#f87171',
                            '--brick-right': '#dc2626',
                            fill: '#dc2626',
                          } as React.CSSProperties
                        }
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
};

export default LegoLoader;
