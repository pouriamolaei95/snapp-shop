import Link from "next/link";
import { Home } from "lucide-react";
import NotFound from "@/lib/components/not-found";
import { Button } from "@/lib/components/ui";
import { CONTENT } from "@/lib/const";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <NotFound
        title={CONTENT.PAGE_NOT_FOUND}
        description={CONTENT.PAGE_NOT_FOUND_DESCRIPTION}
        iconSize={80}
      />
      <Link href="/">
        <Button variant="primary" className="mt-8">
          <Home size={20} />
          {CONTENT.GO_HOME}
        </Button>
      </Link>
    </div>
  );
}
