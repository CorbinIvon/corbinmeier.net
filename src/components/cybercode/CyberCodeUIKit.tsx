import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ElementType,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { useRevealOnScroll } from "./useCyberCodeEffects";

/**
 * CyberCode UI Kit — neon terminal/IDE-flavored primitives: windows, code
 * blocks, stat cards, skill bars, project cards, form fields, and buttons.
 * Every accent-driven color reads from CSS custom properties set per
 * instance, so multiple accents can coexist on one page. Pair with
 * `CyberCodeStyles` (mounted once near the app root) for the custom
 * keyframe animations (glitch, blink, float) used below, and with
 * `CyberCodeBackdrops.tsx` for canvas/cursor decorations.
 */

export type CyberAccent = "green" | "blue" | "purple";

const ACCENT: Record<CyberAccent, { text: string; border: string; glow: string; soft: string }> = {
  green: {
    text: "#00ff88",
    border: "rgba(0,255,136,0.35)",
    glow: "0 0 16px rgba(0,255,136,0.35)",
    soft: "rgba(0,255,136,0.08)",
  },
  blue: {
    text: "#22d3ee",
    border: "rgba(34,211,238,0.35)",
    glow: "0 0 16px rgba(34,211,238,0.35)",
    soft: "rgba(34,211,238,0.08)",
  },
  purple: {
    text: "#c084fc",
    border: "rgba(192,132,252,0.35)",
    glow: "0 0 16px rgba(192,132,252,0.35)",
    soft: "rgba(192,132,252,0.08)",
  },
};

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function accentVars(accent: CyberAccent): CSSProperties {
  const a = ACCENT[accent];
  return {
    ["--cc-text" as string]: a.text,
    ["--cc-border" as string]: a.border,
    ["--cc-glow" as string]: a.glow,
    ["--cc-soft" as string]: a.soft,
  } as CSSProperties;
}

/* ------------------------------------------------------------------------ */
/* Global keyframes — mount once near the app root                          */
/* ------------------------------------------------------------------------ */

/** Injects the @keyframes used by glitch/blink/float utilities below. Mount once, e.g. in App.tsx. */
export function CyberCodeStyles() {
  return (
    <style>{`
      @keyframes cc-glitch-skew { 0%,100%{transform:skew(0)} 20%{transform:skew(0)} 21%{transform:skew(1deg)} 22%{transform:skew(0)} }
      @keyframes cc-glitch-slice-a { 0%{transform:translate(0)} 20%{transform:translate(-3px,3px)} 40%{transform:translate(-3px,-3px)} 60%{transform:translate(3px,3px)} 80%{transform:translate(3px,-3px)} 100%{transform:translate(0)} }
      @keyframes cc-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes cc-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes cc-code-drift { 0%{transform:translate3d(-8%,20px,0);opacity:0} 18%,82%{opacity:1} 100%{transform:translate3d(18%,-70px,0);opacity:0} }
    `}</style>
  );
}

/* ------------------------------------------------------------------------ */
/* Window chrome — macOS-style traffic-light header                        */
/* ------------------------------------------------------------------------ */

export function CyberCodeWindowChrome({
  title,
  icon,
  className,
}: {
  title: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex items-center gap-3 border-b border-white/10 bg-white/5 px-4 py-3", className)}>
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <span className="flex items-center gap-2 truncate font-mono text-xs text-zinc-400">
        {icon}
        {title}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Terminal window + lines                                                  */
/* ------------------------------------------------------------------------ */

export function CyberCodeTerminalWindow({
  title,
  icon,
  accent = "green",
  className,
  children,
}: {
  title: ReactNode;
  icon?: ReactNode;
  accent?: CyberAccent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        className
      )}
      style={accentVars(accent)}
    >
      <CyberCodeWindowChrome title={title} icon={icon} />
      <div className="p-6">{children}</div>
    </div>
  );
}

export function CyberCodeTerminalLine({
  prompt = "$",
  output = false,
  className,
  children,
}: {
  prompt?: ReactNode;
  output?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mb-3 font-mono text-sm leading-relaxed", output ? "pl-6 text-zinc-300" : "text-zinc-200", className)}>
      {!output && (
        <span className="mr-2.5 text-[var(--cc-text)]" style={{ textShadow: "var(--cc-glow)" }}>
          {prompt}
        </span>
      )}
      {children}
    </div>
  );
}

/** Blinking text cursor, e.g. trailing a typewriter effect. */
export function CyberCodeBlinkCursor({ accent = "green", className }: { accent?: CyberAccent; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("text-[var(--cc-text)] [animation:cc-blink_1s_infinite]", className)}
      style={{ ...accentVars(accent), textShadow: "var(--cc-glow)" }}
    >
      |
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Glitch heading                                                           */
/* ------------------------------------------------------------------------ */

export function CyberCodeGlitchHeading({
  as = "h2",
  text,
  accent = "green",
  className,
}: {
  as?: "h1" | "h2" | "h3";
  text: string;
  accent?: CyberAccent;
  className?: string;
}) {
  const As = as as ElementType;
  return (
    <As
      className={cx(
        "relative inline-block font-black text-white [animation:cc-glitch-skew_4s_infinite_linear_alternate-reverse]",
        className
      )}
      style={accentVars(accent)}
    >
      {text}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-[var(--cc-text)] opacity-70 [animation:cc-glitch-slice-a_3s_infinite_linear_alternate-reverse] [clip-path:polygon(0_0,100%_0,100%_35%,0_35%)]"
      >
        {text}
      </span>
    </As>
  );
}

/* ------------------------------------------------------------------------ */
/* Code editor block — tabs + line numbers + code content                   */
/* ------------------------------------------------------------------------ */

export function CyberCodeEditorWindow({
  tabs,
  activeTab = 0,
  lineCount,
  accent = "green",
  className,
  children,
}: {
  tabs: ReactNode[];
  activeTab?: number;
  lineCount?: number;
  accent?: CyberAccent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx("overflow-hidden rounded-xl border border-white/10 bg-zinc-950/80 shadow-[0_10px_40px_rgba(0,0,0,0.3)]", className)}
      style={accentVars(accent)}
    >
      <div className="flex gap-0.5 border-b border-white/10 bg-white/5 px-2 pt-2">
        {tabs.map((tab, index) => (
          <span
            key={index}
            className={cx(
              "rounded-t-md px-4 py-1.5 font-mono text-xs",
              index === activeTab ? "border-t-2 border-[var(--cc-text)] bg-zinc-950/80 text-zinc-200" : "text-zinc-500"
            )}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="flex p-5">
        {lineCount !== undefined && (
          <div
            aria-hidden="true"
            className="mr-5 select-none border-r border-white/10 pr-5 font-mono text-xs leading-7 text-zinc-600"
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
        )}
        <div className="overflow-x-auto font-mono text-sm leading-7 text-zinc-200">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Stat card with animated counter                                          */
/* ------------------------------------------------------------------------ */

export function CyberCodeStatCard({
  icon,
  value,
  suffix = "",
  label,
  accent = "green",
  className,
}: {
  icon?: ReactNode;
  value: number;
  suffix?: string;
  label: string;
  accent?: CyberAccent;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex min-h-[150px] flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 text-center transition-transform hover:-translate-y-1",
        className
      )}
      style={accentVars(accent)}
    >
      {icon && (
        <div
          className="mb-2.5 flex h-13 w-13 items-center justify-center rounded-2xl border text-[var(--cc-text)]"
          style={{ borderColor: "var(--cc-border)", background: "var(--cc-soft)" }}
        >
          {icon}
        </div>
      )}
      <div className="text-3xl font-bold text-[var(--cc-text)]" style={{ textShadow: "var(--cc-glow)" }}>
        {value}
        {suffix}
      </div>
      <div className="mt-2 text-xs text-zinc-500">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Skill bar — animates fill into view on scroll                            */
/* ------------------------------------------------------------------------ */

export function CyberCodeSkillBar({
  name,
  level,
  accent = "green",
  className,
}: {
  name: string;
  level: number;
  accent?: CyberAccent;
  className?: string;
}) {
  const [ref, visible] = useRevealOnScroll<HTMLDivElement>();
  return (
    <div ref={ref} className={cx("grid grid-cols-[minmax(86px,110px)_1fr_42px] items-center gap-3", className)} style={accentVars(accent)}>
      <span className="truncate text-xs text-zinc-400">{name}</span>
      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[var(--cc-text)] transition-[width] duration-1000 ease-out"
          style={{ width: visible ? `${level}%` : "0%", boxShadow: "var(--cc-glow)" }}
        />
      </div>
      <span className="text-right text-xs text-[var(--cc-text)]">{level}%</span>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Project card — header/body/footer slots                                  */
/* ------------------------------------------------------------------------ */

export function CyberCodeProjectCard({
  fileName,
  fileIcon,
  tags = [],
  links,
  accent = "purple",
  className,
  children,
}: {
  fileName: ReactNode;
  fileIcon?: ReactNode;
  tags?: string[];
  links?: ReactNode;
  accent?: CyberAccent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={cx(
        "overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:-translate-y-2",
        className
      )}
      style={accentVars(accent)}
    >
      <CyberCodeWindowChrome title={fileName} icon={fileIcon} />
      <div className="max-h-[250px] overflow-hidden p-5 font-mono text-xs leading-relaxed text-zinc-300">{children}</div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <CyberCodeTag key={tag} accent={accent}>
              {tag}
            </CyberCodeTag>
          ))}
        </div>
        {links && <div className="flex gap-3">{links}</div>}
      </div>
    </article>
  );
}

export function CyberCodeTag({
  accent = "green",
  className,
  children,
}: {
  accent?: CyberAccent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cx("rounded border px-2.5 py-1 text-[0.65rem] text-[var(--cc-text)]", className)}
      style={{ ...accentVars(accent), borderColor: "var(--cc-border)", background: "var(--cc-soft)" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Button                                                                    */
/* ------------------------------------------------------------------------ */

export function CyberCodeButton({
  accent = "green",
  className,
  type = "button",
  children,
  ...rest
}: {
  accent?: CyberAccent;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3 font-mono text-sm text-[var(--cc-text)] transition-all hover:-translate-y-0.5",
        className
      )}
      style={{
        ...accentVars(accent),
        borderColor: "var(--cc-text)",
        textShadow: "var(--cc-glow)",
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function CyberCodeLinkButton({
  accent = "blue",
  className,
  children,
  ...rest
}: {
  accent?: CyberAccent;
  className?: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3.5 py-2.5 text-xs text-zinc-300 no-underline transition-colors hover:text-[var(--cc-text)]",
        className
      )}
      style={{ ...accentVars(accent), borderColor: "var(--cc-border)", background: "var(--cc-soft)" }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------------ */
/* Form field — CLI-style prompt + input/textarea                           */
/* ------------------------------------------------------------------------ */

type FormFieldBase = {
  promptIcon?: ReactNode;
  accent?: CyberAccent;
  className?: string;
};

export function CyberCodeFormField({
  promptIcon,
  accent = "green",
  className,
  multiline,
  ...rest
}: FormFieldBase &
  (
    | ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
    | ({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
  )) {
  return (
    <div className={cx("flex items-start gap-3", className)} style={accentVars(accent)}>
      <span className="flex min-w-11 items-center justify-center pt-2 text-[var(--cc-text)]">{promptIcon ?? ">"}</span>
      {multiline ? (
        <textarea
          className="min-h-[100px] flex-1 resize-y rounded-md border border-white/10 bg-white/5 p-2.5 font-mono text-sm text-zinc-100 outline-none focus:border-[var(--cc-text)]"
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className="flex-1 rounded-md border border-white/10 bg-white/5 p-2.5 font-mono text-sm text-zinc-100 outline-none focus:border-[var(--cc-text)]"
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Social link — circular icon with hover tooltip                           */
/* ------------------------------------------------------------------------ */

export function CyberCodeSocialLink({
  icon,
  label,
  accent = "purple",
  className,
  ...rest
}: {
  icon: ReactNode;
  label: string;
  accent?: CyberAccent;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      aria-label={label}
      className={cx(
        "group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-zinc-400 transition-all hover:-translate-y-1 hover:text-[var(--cc-text)]",
        className
      )}
      style={{ ...accentVars(accent), ["--tw-hover-border" as string]: "var(--cc-border)" }}
      {...rest}
    >
      {icon}
      <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-zinc-900 px-2 py-1 text-[0.7rem] text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------------ */
/* Status pill — pulsing dot + label                                        */
/* ------------------------------------------------------------------------ */

export function CyberCodeStatusPill({
  online = true,
  label = "online",
  accent = "green",
  className,
}: {
  online?: boolean;
  label?: string;
  accent?: CyberAccent;
  className?: string;
}) {
  return (
    <div
      className={cx("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs", className)}
      style={{ ...accentVars(accent), borderColor: "var(--cc-border)", background: "var(--cc-soft)", color: "var(--cc-text)" }}
    >
      <span
        className={cx("h-2 w-2 rounded-full bg-[var(--cc-text)]", online && "animate-pulse")}
        style={{ boxShadow: "var(--cc-glow)" }}
      />
      {label}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Feature link card — icon + title + subtitle + arrow                      */
/* ------------------------------------------------------------------------ */

export function CyberCodeFeatureLinkCard({
  icon,
  eyebrow,
  title,
  subtitle,
  accent = "blue",
  className,
  ...rest
}: {
  icon?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  accent?: CyberAccent;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cx(
        "grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border p-4.5 no-underline transition-transform hover:-translate-y-1",
        className
      )}
      style={{
        ...accentVars(accent),
        borderColor: "var(--cc-border)",
        background: "var(--cc-soft)",
      }}
      {...rest}
    >
      {icon && (
        <span
          className="flex h-13.5 w-13.5 items-center justify-center rounded-2xl border text-2xl text-[var(--cc-text)]"
          style={{ borderColor: "var(--cc-border)", background: "var(--cc-soft)" }}
        >
          {icon}
        </span>
      )}
      <span className="flex flex-col gap-1">
        {eyebrow && <span className="text-xs text-zinc-400">{eyebrow}</span>}
        <strong className="text-base text-zinc-100">{title}</strong>
        {subtitle && <small className="text-xs text-zinc-500">{subtitle}</small>}
      </span>
      <span aria-hidden="true" className="text-lg text-[var(--cc-text)]">
        &#8599;
      </span>
    </a>
  );
}
