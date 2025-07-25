export default function PageHeader({ title, menu }) {
    return (
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">
                        {title}
                    </h4>

                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                                <a href="javascript: void(0);">{title}</a>
                            </li>
                            <li className="breadcrumb-item active">
                                {menu}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}