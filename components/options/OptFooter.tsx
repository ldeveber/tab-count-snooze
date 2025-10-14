import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "@/components/ui/link";

export function OptFooter() {
  return (
    <p className="text-center text-muted-foreground text-xs">
      Tab Count Snooze was inspired by{" "}
      <Link
        href="https://chromewebstore.google.com/detail/tab-manager-plus-for-chro/cnkdjjdmfiffagllbiiilooaoofcoeff"
        target="_blank"
        rel="noopener"
      >
        Tab Manager Plus
      </Link>{" "}
      <Link
        variant="muted"
        href="https://github.com/stefanXO/Tab-Manager-Plus"
        target="_blank"
        rel="noopener"
      >
        <SiGithub className="inline" />
      </Link>{" "}
      and{" "}
      <Link
        href="https://chromewebstore.google.com/detail/cnkdjjdmfiffagllbiiilooaoofcoeff"
        target="_blank"
        rel="noopener"
      >
        Tab Snooze
      </Link>{" "}
      <Link
        variant="muted"
        href="https://github.com/csandapp/tab-snooze-extension-continued"
        target="_blank"
        rel="noopener"
      >
        <SiGithub className="inline-block" />
      </Link>
      .
    </p>
  );
}
