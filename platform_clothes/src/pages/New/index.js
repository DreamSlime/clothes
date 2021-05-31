import { Image,Button,Upload, Modal,message } from 'antd';
import { PlusOutlined,PoweroffOutlined } from '@ant-design/icons';
import axios from 'axios'

// eslint-disable-next-line no-undef
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        "status": "",
        "url":   "",
      }
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign,no-undef
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      // eslint-disable-next-line no-param-reassign
      fileList = fileList.map(item => {
        // 相关文件对象数据格式化处理
        return item;
      });
    }
    // 避免原来的文件丢失，这样子写就可以了
    this.setState({ fileList: file.status ? [...fileList] : this.state.fileList });
  };

  upload = (fileObj) => {
    const formData = new FormData()
    formData.append('file', fileObj.file)
    formData.append('type', fileObj.file.type)
    return axios.post('/upload', formData)
      .then(res => {
        const { status,url } = res.data
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.fileList[0].status=status
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.fileList[0].url=url
        message.success(`成功：msg：${status} ${url}`)
      })
      .catch(e => {
        message.success(`失败：msg：${e}`)
      })


  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={this.upload}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

// eslint-disable-next-line camelcase
const peature_url = new Array(0);


// eslint-disable-next-line no-undef
class App extends React.Component {
  getPeatureUrl(){
    axios.post('/similar', )
      .then(res => {
        const { filenames } = res.data
        // eslint-disable-next-line react/no-direct-mutation-state
        peature_url.push(filenames[0])
        peature_url.push(filenames[1])
        peature_url.push(filenames[2])
        peature_url.push(filenames[3])
        // eslint-disable-next-line react/no-direct-mutation-state
        message.success(`成功：msg：${peature_url[0]} ${peature_url[1]} ${peature_url[2]} ${peature_url[3]}`)
      })
      .catch(e => {
        message.success(`失败：msg：${e}`)
      })
  }

  state = {
    loadings: [],
  };

  enterLoading = index => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;
      this.getPeatureUrl()
      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 6000);
  };

  render() {
    const { loadings } = this.state;
    return (
      <>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => this.enterLoading(1)}
        >
          匹配类似服饰
        </Button>
      </>
    );
  }
}

function ImageDemo() {
  return (
    <Image.PreviewGroup>
      <Image
        width={300}
        height={500}
        src={peature_url[0]}
      />
      <Image
        width={300}
        height={500}
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
      <Image
        width={300}
        height={500}
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
      <Image
        width={300}
        height={500}
        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
      />
    </Image.PreviewGroup>
  );
}

export default () => {
  return(
    <div>
          <div>
          <PicturesWall />
          </div>
      <div>
        <App />
      </div>
      <div>
          <div>
            <ImageDemo/>
          </div>
      </div>
    </div>
  )
}
