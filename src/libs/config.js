//登录
let API_LOGIN =  "api/auth/v1/login"
//登录验证码
let API_LOGIN_CODE = "api/auth/v1/captcha"
//退出登录
let API_LOGIN_OUT = 'auth/logout'

//业务报表字段配置下的字段列表
let API_FIELD_LIST = 'role/field_set/list'
//业务报表字段配置保存
let API_FIELD_SAVE = 'role/field_set/insert'
//数据配置弹窗
let API_DATA_LIST = 'role/data_set/detail'
//数据配置弹窗保存
let API_DATA_SAVE = 'role/data_set/save'
//角色用户列表
let API_ROLE_USER_LIST = 'user/role/page/0/10000'
//用户列表
let API_USER_LIST = 'user/page'
//用户列表
let API_USER_ALL_LIST = 'user/all_list'
//用户新增
let API_USER_ADD= 'user/insert'
//用户编辑
let API_USER_UPDATE= 'user/update'
//用户删除
let API_USER_DELETE= 'user/delete'
//角色配菜单
let API_TREE_ROLE = 'role/menu/allAndRollAll';
//角色配置菜单保存
let API_ROLE_MENU_SAVE = 'role/menu/updateByRole'
//新建角色
let API_ROLE_ADD = 'role/insert'
//角色编辑
let API_ROLE_UPDATE = 'role/update'
//角色删除
let API_ROLE_DELETE = 'role/delete'
//角色列表
let API_ROLE_LIST = 'role/page/0/10000'
//角色详情
let API_ROLE_DETAIL = 'role/detail'
//角色启用禁用
let API_ROLE_ENABLED = 'role/enabled'
//报表列表list
let API_ROLE_ALL_LIST = 'report/dataType/list'
//角色拥有的报表
let API_ROLE_REPORT_LIST = 'role/report/list'
//角色选报表
let API_ROLE_INSERT_REPORT_LIST = 'role/report/insert'
//角色报表删除
let API_ROLE_DELETE_REPORT_LIST = 'role/report/delete'
//角色用户添加
let API_ROLE_USER_ADD_LIST = 'user/role/insert'
//角色用户删除
let API_ROLE_USER_DELETE_LIST = 'user/role/delete'
//获取所有菜单
let API_MENU_FINDALL = 'menu/findAll'
//根据id获取菜单节点信息
let API_ROLE_MENU_DETAIL = 'role/menu/detail'
//新增菜单节点
let API_ROLE_MENU_INSERT = 'role/menu/insert'
//编辑菜单节点
let API_ROLE_MENU_UPDATE = 'role/menu/updateByMenu'
//删除菜单节点
let API_ROLE_MENU_DELETE = 'role/menu/delete'
//组织树
let API_ACCOUNT_DEPTTREE = 'dept/depttree';
export default{
    API_LOGIN,
    API_LOGIN_CODE,
    API_LOGIN_OUT,
    API_FIELD_LIST,
    API_FIELD_SAVE,
    API_DATA_LIST,
    API_DATA_SAVE,
    API_ROLE_USER_LIST,
    API_USER_LIST,
    API_USER_ADD,
    API_USER_UPDATE,
    API_USER_DELETE,
    API_TREE_ROLE,
    API_ROLE_MENU_SAVE,
    API_ROLE_ADD,
    API_ROLE_UPDATE,
    API_ROLE_DELETE,
    API_ROLE_LIST,
    API_ROLE_DETAIL,
    API_ROLE_ENABLED,
    API_ROLE_ALL_LIST,
    API_ROLE_REPORT_LIST,
    API_ROLE_INSERT_REPORT_LIST,
    API_ROLE_DELETE_REPORT_LIST,
    API_ROLE_USER_ADD_LIST,
    API_ROLE_USER_DELETE_LIST,
    API_MENU_FINDALL,
    API_ROLE_MENU_DETAIL,
    API_ROLE_MENU_INSERT,
    API_ROLE_MENU_UPDATE,
    API_ROLE_MENU_DELETE,
    API_ACCOUNT_DEPTTREE,
    API_USER_ALL_LIST
}