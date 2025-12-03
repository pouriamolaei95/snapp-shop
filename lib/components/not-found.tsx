import { PackageX } from "lucide-react";
import { CONTENT } from "../const/content.const";

type NotFoundProps = {
  title?: string;
  description?: string;
  iconSize?: number;
};

export default function NotFound({
  title = CONTENT.NO_PRODUCTS_FOUND,
  description = CONTENT.NO_PRODUCTS_DESCRIPTION,
  iconSize = 64,
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-6 shadow-inner">
        <PackageX size={iconSize} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
