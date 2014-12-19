package com.pub.util;

public class R {
	
	/** 申请家庭状态:录入 */
	public static final int STATE_ADD = 101;
	/** 申请家庭状态:初审 */
	public static final int STATE_PRIMARY_AUDIT = 102;
	/** 申请家庭状态:初审不能过 */
	public static final int STATE_PRIMARY_AUDIT_NO = 103;
	/** 申请家庭状态:初审通过/调查 */
	public static final int STATE_PRIMARY_AUDIT_YES = 10;
	
	
	/** 申请家庭状态:车管/调查录入 */
	public static final int STATE_CAR_ADD = 201;
	/** 申请家庭状态:车管/调查待审核 */
	public static final int STATE_CAR_WAIT_AUDIT = 202;
	/** 申请家庭状态:车管/调查审核不通过 */
	public static final int STATE_CAR_AUDIT_NO = 203;
	
	

	/** 申请家庭状态:房管/调查录入 */
	public static final int STATE_HOUSE_ADD = 301;
	/** 申请家庭状态:房管/调查待审核 */
	public static final int STATE_HOUSE_WAIT_AUDIT = 302;
	/** 申请家庭状态:房管/调查审核不通过 */
	public static final int STATE_HOUSE_AUDIT_NO = 303;
	
	
	/**tax input*/
	public static final int STATE_TAX_ADD = 401;
	/** 申请家庭状态:TAX/调查待审核 */
	public static final int STATE_TAX_WAIT_AUDIT = 402;
	/** 申请家庭状态:TAX/调查审核不通过 */
	public static final int STATE_TAX_AUDIT_NO = 403;
	

	/** 申请家庭状态:银行/调查录入 */
	public static final int STATE_BANK_ADD = 420;
	/** 申请家庭状态:银行/调查待审核 */
	public static final int STATE_BANK_WAIT_AUDIT = 422;
	/** 申请家庭状态:银行/调查审核不通过 */
	public static final int STATE_BANK_AUDIT_NO = 425;
	
	
	
	/** 申请家庭状态:协助调查的已反馈 */
	public static final int STATE_AUDIT_OK = 100;
	
	
	/** 申请家庭状态:申请合格 */
	public static final int STATE_OK = 600;
	/** 申请家庭状态:申请不合格 */
	public static final int STATE_NO = 610;
	/** 申请家庭状态:申请信息不全 */
	public static final int STATE_NEED_CONTENT = 620;
	
	
	
	/** 申请家庭状态表的类别代码: 民政 */
	public static final String STATE_CIVIL_CODE = "civil";
	/** 申请家庭状态表的类别代码: 房管 */
	public static final String STATE_HOUSE_CODE = "house";
	/** 申请家庭状态表的类别代码: 车管 */
	public static final String STATE_CAR_CODE = "car";
	/** 申请家庭状态表的类别代码: 银行 */
	public static final String STATE_BANK_CODE = "bank";
	/***/
	public static final String STATE_TAX_CODE="tax";

}
