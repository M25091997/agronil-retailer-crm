import { Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

export default function CardHeader({ title, btnName, url }) {
    return (
        <div className="card-header align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">{title}</h4>
            {btnName && (
                <div className="flex-shrink-0">
                    <div className="d-flex flex-wrap gap-2 mb-0 my-n1">
                        <Link href={url}>
                            <button type="button" className="btn btn-dark btn-sm waves-effect waves-light d-flex align-items-center gap-1">
                                <Plus size={16} />
                                {btnName}
                            </button>
                        </Link>
                    </div>
                </div>

            )}

        </div>

    )
}