import Image from 'next/image';

export default function AppLogo({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/assets/images/app_logo.png"
      alt="ResortIQ"
      width={size}
      height={size}
      className="rounded-lg object-contain"
      priority
    />
  );
}
