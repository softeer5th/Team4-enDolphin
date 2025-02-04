type ClassName = string | undefined | null | false;

const clsx = (...classNames: ClassName[]) => classNames.filter(Boolean).join(' ');

export default clsx;