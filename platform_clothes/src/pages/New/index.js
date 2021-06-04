// eslint-disable-next-line max-classes-per-file
import { Skeleton,Button,Upload, Modal,message,PageHeader, Descriptions,Comment, Avatar, Form, List, Input } from 'antd';
import { PlusOutlined,PoweroffOutlined } from '@ant-design/icons';
import axios from 'axios'




// eslint-disable-next-line no-undef
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
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
      window.location.href="http://localhost:8000/GetSimilar"
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





export default () => {
  return(
    <div>
      <div>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="服装识别系统"
            subTitle="通过上传服装图片，在图片库中寻找相类似的衣服"
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Created">组长:卢桦茵   组员:李炜柯 李夏瑶</Descriptions.Item>
              <Descriptions.Item label="Association">
                <a>18级大数据2班</a>
              </Descriptions.Item>
              <Descriptions.Item label="Creation Time">2021-05-03</Descriptions.Item>
              <Descriptions.Item label="Effective Time">2021-06-15</Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
      </div>
      <div style={{ width:'100px',height:'100px'}}></div>
    <div style={{ padding: '0 50px' ,textAlign :'center',width:'1500px',height:'500px'}}>
          <div >
          <PicturesWall />
          </div>
      <div>
        <App />
      </div>
      <div style={{ width:'100px',height:'100px'}}></div>
      <div style={{ textAlign :'center',width:'100%',height:'250px'}}>
        <Skeleton active />
      </div>
    </div>
    </div>
  )
}
