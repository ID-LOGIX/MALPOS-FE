import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row justify-content-between">
          <div className="col-sm-6">
            <h1 className="m-0">{items[items.length - 1].label}</h1>
          </div>
          <div className="col-sm-6 pt-2 d-flex flex-row-reverse">
            <ol className="breadcrumb float-sm-right">
              {items.map((item, index) => (
                <li key={index} className="breadcrumb-item">
                  {index === items.length - 1 ? (
                    <>{item.label}</>
                  ) : (
                    <Link to={item.link} style={{ color: "#f29b30" }}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
