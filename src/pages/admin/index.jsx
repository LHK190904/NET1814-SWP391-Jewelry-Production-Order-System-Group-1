import { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Navbar from "../../components/navbar";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import axios from "axios";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Admin() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      username: "",
      email: "",
      password: "",
      role: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: (
        <span className="text-2xl font-bold text-[#64748B]">Tên đăng nhập</span>
      ),
      dataIndex: "username",
      width: "25%",
      editable: true,
    },
    {
      title: <span className="text-2xl font-bold text-[#64748B]">EMAIL</span>,
      dataIndex: "email",
      width: "25%",
      editable: true,
    },
    {
      title: (
        <span className="text-2xl font-bold text-[#64748B]">Mật khẩu</span>
      ),
      dataIndex: "password",
      width: "20%",
      editable: true,
    },
    {
      title: <span className="text-2xl font-bold text-[#64748B]">Vị trí </span>,
      dataIndex: "role",
      width: "10%",
      editable: true,
    },
    {
      // title: 'Operation',
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Lưu
            </Typography.Link>
            <a onClick={cancel}>Hủy</a>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Chỉnh sửa
          </Typography.Link>
        );
      },
    },
    {
      // title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Popconfirm
          title="Xóa"
          description="Xóa tài khoản?"
          onConfirm={() => handleDeleteAccount(id)}
          okText="Có"
          cancelText="Không"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // Modal
  const [selectedRole, setSelectedRole] = useState("Vị trí");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function fetchAccount() {
    try {
      const response = await axios.get(
        "https://663ddef6e1913c476795b585.mockapi.io/account"
      );
      // Thêm key vào từng phần tử của mảng dữ liệu
      const formattedData = response.data.map((account) => ({
        ...account,
        key: account.id, // Sử dụng id làm key
      }));
      setData(formattedData); // Sử dụng dữ liệu từ API để cập nhật state
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    fetchAccount();
  }, []);

  //handleDelete
  async function handleDeleteAccount(id) {
    await axios.delete(
      `https://663ddef6e1913c476795b585.mockapi.io/account/${id}`
    );
    const listAfterDelete = data.filter((account) => account.id !== id);
    setData(listAfterDelete);
  }

  async function handleUpdateAccount(id, ) { 
    await axios.put(
      `https://663ddef6e1913c476795b585.mockapi.io/account/${id}`
    );
  }
  return (
    <>
      <div className="bg-[#353640] text-white h-40 flex justify-center items-center text-2xl">
        <h1>Welcome Admin</h1>
      </div>
      <Navbar />
      <div className="bg-[#D9D9D9] h-80 flex pt-5 justify-center">
        <Button type="primary" onClick={showModal}>
          Tạo tài khoản
        </Button>
        <Modal
          title={
            <h2 className="text-black text-center text-3xl">Tạo tài khoản</h2>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="ml-3">
            <h2 className="font-semibold">Tên đăng nhập</h2>
            <input className="rounded-md pl-2 w-80 h-8 border border-inherit" />
          </div>
          <div className="ml-3">
            <h2 className="font-semibold">Mật khẩu</h2>
            <input className="rounded-md pl-2 w-80 h-8 border border-inherit" />
          </div>
          <div className="ml-3">
            <h2 className="font-semibold">Email</h2>
            <input className="rounded-md pl-2 w-80 h-8 border border-inherit" />
          </div>

          <Menu
            as="div"
            className="relative inline-block text-left ml-10 w-[170px]"
          >
            <div className="w-[200px]">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 items-center h-8 mt-6">
                {selectedRole}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem
                  className="w-full"
                  as="button"
                  onClick={() => setSelectedRole("Nhân viên bán hàng")}
                >
                  <div className="block w-full px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Nhân viên bán hàng
                  </div>
                </MenuItem>
                <MenuItem
                  className="w-full"
                  as="button"
                  onClick={() => setSelectedRole("Nhân viên thiết kế")}
                >
                  <div className="block w-full px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Nhân viên thiết kế
                  </div>
                </MenuItem>
                <MenuItem
                  className="w-full"
                  as="button"
                  onClick={() => setSelectedRole("Quản lí")}
                >
                  <div className="block w-full px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Quản lí
                  </div>
                </MenuItem>
                <MenuItem
                  className="w-full"
                  as="button"
                  onClick={() => setSelectedRole("Nhân viên gia công")}
                >
                  <div className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Nhân viên gia công
                  </div>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </Modal>
      </div>
      <div className="p-5">
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </>
  );
}

export default Admin;
