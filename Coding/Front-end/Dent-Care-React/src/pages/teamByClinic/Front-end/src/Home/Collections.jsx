import Pin from "../components/Pin";
import "./Collections.css";
import { Container } from "react-bootstrap";

const size = ["small", "medium", "large"];

const getImageSize = () => {
  const getIndex = Math.floor(Math.random() * size.length);
  return size[getIndex];
};

function Collections() {
  //   const person = people.map((person) => (
  //     <Pin imageSource={getImageUrl(person)} size={getImageSize()} />
  //   ));

  return (
    <Container style={{paddingTop: "10px"}}>
      <div className="view" style={styles.pin_container}>
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
        <Pin size={getImageSize()} />
      </div>
    </Container>
  );
}

const styles = {
  pin_container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 300px)",
    gridAutoRows: "10px",
    justifyContent: "center",
  },
};

export default Collections;
