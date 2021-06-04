import {Image,Rate} from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

function ImageDemo() {

  return (
    <Image.PreviewGroup>
      <div>
      <Image
        width={350}
        height={450}
        id="123"
        src="http://127.0.0.1:6789/similar/1.jpg"
      />  <span>&nbsp; &nbsp; &nbsp;</span>
      <Image
        width={350}
        height={450}
        src="http://127.0.0.1:6789/similar/2.jpg"
      /> <span>&nbsp; &nbsp; &nbsp;</span>
      <Image
        width={350}
        height={450}
        src="http://127.0.0.1:6789/similar/3.jpg"
      /> <span>&nbsp; &nbsp; &nbsp;</span>
      <Image
        width={350}
        height={450}
        src="http://127.0.0.1:6789/similar/4.jpg"
      /> <span>&nbsp; &nbsp; &nbsp;</span>
      </div>
    </Image.PreviewGroup>
  );
}

export default () => {
  return(
    <div>
      <div style={{ textAlign :'center',width:'100px',height:'100px'}}/>
      <div>
        <ImageDemo></ImageDemo>
      </div>
      <div style={{ textAlign :'center',width:'50px',height:'50px'}}/>
      <div>
        <h2>请你给这次识别打分：</h2>
        <Rate defaultValue={3} character={({ index }) => customIcons[index + 1]} />
      </div>
    </div>
  )
}
