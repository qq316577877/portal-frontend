var AjaxUrl ={
	//注册、登录
	member_check_mobile_ajax:"/member/check_mobile_ajax", //注册——检测手机号
	member_register_account_ajax:"/member/register_account_ajax", //注册——用户注册(基本信息)
	member_login_ajax:"/member/login_ajax",//登陆——用户登陆

	//找回密码与重置密码
	member_is_mobile_registered_ajax:"/member/is_mobile_registered_ajax",//找回密码——检测手机号是否注册
	member_check_mobile_captcha_ajax:"/member/password/check_mobile_captcha_ajax",//找回密码——检测手机验证码
	member_reset_password_ajax:"/member/password/reset_password_ajax",//重置密码——重置用户密码

	
    // 会员中心(账户信息与安全[会员信息页面])
	member_get_user_information_ajax:"/member/get_user_information_ajax",//会员信息——查询会员信息
	member_check_current_mobile_ajax:"/member/info/check_current_mobile_ajax",//当前手机号验证(修改手机号)
	member_new_mobile_ajax:"/member/info/new_mobile_ajax",//提交新手机号
	member_binding_mail_ajax:"/member/info/binding_mail_ajax",//绑定邮箱
	member_modify_pwd_ajax:"/member/info/modify_pwd_ajax",//修改密码
	member_modify_qq_ajax:"/member/info/modify_qq_ajax",//修改QQ
	member_modify_phonenum_ajax:"/member/info/modify_phonenum_ajax",//修改联系电话

	
	//会员认证
	member_personal_auth_ajax:"/member/enterprise/auth/personal_auth_ajax",//会员认证——提交认证（个人认证）
	member_is_enter_name_available_ajax:"/member/enterprise/auth/is_enter_name_available_ajax",//会员认证——检查企业名称是否已存在(企业认证)
	member_enterprise_auth_ajax:"/member/enterprise/auth/enterprise_auth_ajax",//会员认证——提交认证（企业认证）
	member_get_user_auth_information_ajax:"/member/enterprise/auth/get_user_auth_information_ajax",//会员认证——查询会员认证信息(个人与企业通用)
	member_enterprise_auth_status_ajax:"/member/enterprise/auth/enterprise_auth_status_ajax",//会员认证——查询认证结果


	//会员信息-银行卡相关
	member_get_user_bank_information_ajax:"/member/bank/get_user_bank_information_ajax",//会员信息——查询会员银行账号信息
	member_add_user_bank_information_ajax:"/member/bank/add_user_bank_information_ajax",//会员信息——会员新增银行卡号
	member_check_user_bank_information_ajax:"/member/bank/check_user_bank_information_ajax",//会员信息——验证银行卡号
	member_update_user_bank_information_ajax:"/member/bank/update_user_bank_information_ajax",//会员信息——会员修改银行卡号信息
	member_delete_user_bank_information_ajax:"/member/bank/delete_user_bank_information_ajax",//会员信息——会员删除银行卡
	member_set_default_bank_ajax:"/member/bank/set_default_bank_ajax",//会员信息——设为默认银行卡
	
	//会员信息-收件地址相关
	member_get_user_receive_address_ajax:"/member/delivery_address/get_user_receive_address_ajax",//会员信息——查询会员收件地址信息
	member_add_user_receive_address_ajax:"/member/delivery_address/add_user_receive_address_ajax",//会员信息——会员新增收件地址
	member_update_user_receive_address_ajax:"/member/delivery_address/update_user_receive_address_ajax",//会员信息——会员修改收件地址信息
	member_delete_user_receive_address_ajax:"/member/delivery_address/delete_user_receive_address_ajax",//会员信息——会员删除收件地址
	member_set_default_address_ajax:"/member/delivery_address/set_default_address_ajax",//会员信息——设为默认地址
	
	//会员信息-供应商
	member_get_user_supplier_information_ajax:"/member/supplier/get_user_supplier_information_ajax",//会员信息——查询会员供应商信息
	member_add_user_supplier_information_ajax:"/member/supplier/add_user_supplier_information_ajax",//会员信息——会员新增供应商
	member_update_user_supplier_information_ajax:"/member/supplier/update_user_supplier_information_ajax",//会员信息——会员修改供应商信息
	member_delete_user_supplier_information_ajax:"/member/supplier/delete_user_supplier_information_ajax",//会员信息——会员删除供应商
	member_supplier_query_agent_ajax:"/order/supplier_query_agent_ajax",//代采请求供应商
	member_verify_enterprise_ajax:"/order/verify_enterprise_ajax",//直采查询清关信息
	common_supported_countries_ajax:"/common/supported_countries_ajax",//获取国家
	common_supported_cities_ajax:"/common/supported_cities_ajax",//获取城市

	//check_ajax: "/member/notify/check_ajax",
	//batch_check_ajax: "/member/notify/batch_check_ajax",

	
    // 短信验证码
    captcha_send_sms_ajax: "/captcha/send_sms_ajax",//发送短信验证码,需要图形验证码
	captcha_send_sms_direct_ajax:"/captcha/send_sms_direct_ajax",//发送短信验证码(无需图形验证码，用户登录态可用)
	
	//图形验证码
	captcha_pic_generate_ajax:"/captcha/pic_generate_ajax",//获取图形验证码
	captcha_pic_verify_ajax:"/captcha/pic_verify_ajax",//校验图形验证码

	//订单
	order_find_all_goods:"/order/find_all_goods",//查询所有商品
	order_create_order_ajax:"/order/create_order_ajax",//创建订单
	order_detail:"/order/detail",//订单详情
	order_create_logistics:"/order/create_logistics",//创建物流服务
	order_logistics_detail_ajax:"/order/logistics_detail_ajax",//查询物流详情
	order_order_cancle_ajax:"/order/center/order_cancle_ajax",//取消订单
	order_find_order_byPage_ajax:"/order/center/find_order_byPage_ajax",//查询订单分页信息
	order_loadLoanInfosByTransactionNoList:"/loan/info/loadLoanInfosByTransactionNoList",//订单详情查询资金服务信息
	order_confirm_submit_ajax:"/order/center/confirm_submit_ajax",//订单提交
	order_container_detail_ajax:"/order/container_detail_ajax",//查询货柜的贷款信息


	//资金服务
	loan_get_loan_user_auth_information_ajax:"/loan/auth/get_loan_user_auth_information_ajax",//查询资金服务银行预留信息
	//loan_send_loan_sms_direct_ajax:"/captcha/send_loan_sms_direct_ajax",//资金服务发送短信
	loan_get_loan_user_credit_information_ajax:"/loan/auth/get_loan_user_credit_information_ajax",//查询用户的信贷信息
	loan_get_loan_info_interest_rate_ajax:"/loan/info/get_loan_info_interest_rate_ajax",//查询资金服务的年利率和月利率
	loan_get_loan_info_status_apply_list_ajax:"/loan/info/get_loan_info_status_apply_list_ajax",//查询我的资金服务列表
	loan_get_loan_info_list_apply_ajax:"/loan/info/get_loan_info_list_apply_ajax",//查询我的资金服务列表---申请列表
	loan_get_loan_info_list_service_ajax:"/loan/info/get_loan_info_list_service_ajax",//查询我的资金服务列表---服务记录列表
	loan_get_loan_info_details_ajax:"/loan/info/get_loan_info_details_ajax",//查询我的资金服务--详情
	loan_get_loan_info_status_service_list_ajax:"/loan/info/get_loan_info_status_service_list_ajax",//查询我的资金服务列表--服务记录列表所需状态list
	loan_order_send_anxin_ajax:"/debt/order_send_anxin_ajax",
	loan_order_verify_anxin_ajax:"/debt/order_verify_anxin_ajax",
	loan_captcha_send_ajax:"/loan/auth/contract/captcha_send_ajax",//签署合同发送短信验证码
	loan_online_sign_ajax:"/loan/auth/contract/online_sign_ajax",//客户签署借款合同

	//  卡限制
	get_loan_user_credit_information_ajax:"/loan/auth/get_loan_user_credit_information_ajax",
	// 校验实名认证
	get_loan_user_auth_information_ajax:"/loan/auth/get_loan_user_auth_information_ajax",
	//添加婚姻选项list
	get_loan_credit_maritalStatus_list_ajax:"/loan/auth/get_loan_credit_maritalStatus_list_ajax",

	add_loan_user_credit_personal_ajax:"/loan/auth/add_loan_user_credit_personal_ajax",
	add_loan_user_auth_information_ajax:"/loan/auth/add_loan_user_auth_information_ajax"

}

