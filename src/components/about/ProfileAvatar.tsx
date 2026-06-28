import Image from "next/image";

export function ProfileAvatar() {
  return (
    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-muted">
      <Image
        src="/avatar.svg"
        alt=""
        width={96}
        height={96}
        className="h-full w-full object-cover dark:brightness-90 dark:contrast-125"
        priority
      />
    </div>
  );
}
