import { CardItem } from "./CardItem";

export const ContainerCards = ({
  status,
  items = [],
  isDragging,
  handleDragging,
  handleUpdateList,
}) => {
  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = (event) => {
    event.preventDefault();
    const id = +event.dataTransfer.getData("text");
    handleUpdateList(id, status);
    handleDragging(false);
  };

  return (
    <div
      className={`layout-cards ${isDragging ? "layout-dragging" : ""} `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>{status}</p>
      {items.map(
        (item) =>
          status === item?.status && (
            <CardItem
              data={item}
              key={item._id}
              handleDragging={handleDragging}
            />
          )
      )}
    </div>
  );
};
