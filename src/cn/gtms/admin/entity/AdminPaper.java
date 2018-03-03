package cn.gtms.admin.entity;


/**
 * Title: admin_paper
 *
 * Company: Copyright @ 2017 Linkgoo鐗堟潈鎵�鏈�
 *
 * @author: Linkgoo
 * @date: 2018-3-1 23:03:12
 * @version 1.0
 */
 
@SuppressWarnings("serial")
public class AdminPaper implements java.io.Serializable{
	/** 璁烘枃id */
	private Long paperId;
	/** 璁烘枃棰樼洰 */
	private String paperTitle;
	/** 闄愰�変汉鏁� */
	private Integer limitAccount;
	/** 閫夐绫诲瀷锛堣鏂�/璁捐锛� */
	private String paperType;
	/** 棰樼洰鎻忚堪 */
	private String paperDescribtion;
	/** 闄勪欢id */
	private Long documentId;
	/** 鍒涘缓浜� */
	private Long createBy;
	/** 鏄惁鑷嫙 */
	private String isStudentCreate;
	/** 鍒涘缓鏃堕棿 */
	@org.springframework.format.annotation.DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private java.util.Date utcCreate;
	/** 鏇存柊鏃堕棿 */
	@org.springframework.format.annotation.DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private java.util.Date utcUpdate;
	/** 鐘舵�� */
	private String status;
	
	/** 璁烘枃id */
	public Long getPaperId() {
		return paperId;
	}
	/** 璁烘枃id */
	public void setPaperId(Long paperId) {
		this.paperId=paperId;
	}
	/** 璁烘枃棰樼洰 */
	public String getPaperTitle() {
		return paperTitle;
	}
	/** 璁烘枃棰樼洰 */
	public void setPaperTitle(String paperTitle) {
		this.paperTitle=paperTitle;
	}
	/** 闄愰�変汉鏁� */
	public Integer getLimitAccount() {
		return limitAccount;
	}
	/** 闄愰�変汉鏁� */
	public void setLimitAccount(Integer limitAccount) {
		this.limitAccount=limitAccount;
	}
	/** 閫夐绫诲瀷锛堣鏂�/璁捐锛� */
	public String getPaperType() {
		return paperType;
	}
	/** 閫夐绫诲瀷锛堣鏂�/璁捐锛� */
	public void setPaperType(String paperType) {
		this.paperType=paperType;
	}
	/** 棰樼洰鎻忚堪 */
	public String getPaperDescribtion() {
		return paperDescribtion;
	}
	/** 棰樼洰鎻忚堪 */
	public void setPaperDescribtion(String paperDescribtion) {
		this.paperDescribtion=paperDescribtion;
	}
	/** 闄勪欢id */
	public Long getDocumentId() {
		return documentId;
	}
	/** 闄勪欢id */
	public void setDocumentId(Long documentId) {
		this.documentId=documentId;
	}
	/** 鍒涘缓浜� */
	public Long getCreateBy() {
		return createBy;
	}
	/** 鍒涘缓浜� */
	public void setCreateBy(Long createBy) {
		this.createBy=createBy;
	}
	/** 鏄惁鑷嫙 */
	public String getIsStudentCreate() {
		return isStudentCreate;
	}
	/** 鏄惁鑷嫙 */
	public void setIsStudentCreate(String isStudentCreate) {
		this.isStudentCreate=isStudentCreate;
	}
	/** 鍒涘缓鏃堕棿 */
	public java.util.Date getUtcCreate() {
		return utcCreate;
	}
	/** 鍒涘缓鏃堕棿 */
	public void setUtcCreate(java.util.Date utcCreate) {
		this.utcCreate=utcCreate;
	}
	/** 鏇存柊鏃堕棿 */
	public java.util.Date getUtcUpdate() {
		return utcUpdate;
	}
	/** 鏇存柊鏃堕棿 */
	public void setUtcUpdate(java.util.Date utcUpdate) {
		this.utcUpdate=utcUpdate;
	}
	/** 鐘舵�� */
	public String getStatus() {
		return status;
	}
	/** 鐘舵�� */
	public void setStatus(String status) {
		this.status=status;
	}
	
	/**
	 * 鎻掑叆鍓嶆墽琛�
	 */
	public void prePersist() {
		//do something
	}
}
