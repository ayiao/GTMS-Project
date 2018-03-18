package cn.gtms.util;

import java.lang.reflect.Field;
import java.text.NumberFormat;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

public class ListUtils {

	/**
	 * @author yinaibang 鍦ㄦ暟鎹簱涓煡鍑烘潵鐨勫垪琛ㄤ腑锛屽線寰�闇�瑕佸涓嶅悓鐨勫瓧娈甸噸鏂版帓搴忋�� 涓�鑸殑鍋氭硶閮芥槸浣跨敤鎺掑簭鐨勫瓧娈碉紝閲嶆柊鍒版暟鎹簱涓煡璇€��
	 *         濡傛灉涓嶅埌鏁版嵁搴撴煡璇紝鐩存帴鍦ㄧ涓�娆℃煡鍑烘潵鐨刲ist涓帓搴忥紝鏃犵枒浼氭彁楂樼郴缁熺殑鎬ц兘銆� 涓嬮潰灏卞啓涓�涓�氱敤鐨勬柟娉曪紝瀵筶ist鎺掑簭锛�
	 * 
	 *         鑷冲皯闇�瑕佹弧瓒充互涓�5鐐癸細
	 * 
	 *         鈶�.list鍏冪礌瀵硅薄绫诲瀷浠绘剰 ---->浣跨敤娉涘瀷瑙ｅ喅
	 * 
	 *         鈶�.鍙互鎸夌収list鍏冪礌瀵硅薄鐨勪换鎰忓涓睘鎬ц繘琛屾帓搴�,鍗冲彲浠ュ悓鏃舵寚瀹氬涓睘鎬ц繘琛屾帓搴� --->浣跨敤java鐨勫彲鍙樺弬鏁拌В鍐�
	 * 
	 *         鈶�.list鍏冪礌瀵硅薄灞炴�х殑绫诲瀷鍙互鏄暟瀛�(byte銆乻hort銆乮nt銆乴ong銆乫loat銆乨ouble绛夛紝鍖呮嫭姝ｆ暟銆佽礋鏁般��0)銆佸瓧绗︿覆(char銆丼tring)銆佹棩鏈�(java.util.Date)
	 *         --->瀵逛簬鏁板瓧锛氱粺涓�杞崲涓哄浐瀹氶暱搴︾殑瀛楃涓茶В鍐�,姣斿鏁板瓧3鍜�123锛岃浆鎹负"003"鍜�"123"
	 *         ;鍐嶆瘮濡�"-15"鍜�"7"杞崲涓�"-015"鍜�"007"
	 *         --->瀵逛簬鏃ユ湡锛氬彲浠ュ厛鎶婃棩鏈熻浆鍖栦负long绫诲瀷鐨勬暟瀛楋紝鏁板瓧鐨勮В鍐虫柟娉曞涓�
	 * 
	 *         鈶�.list鍏冪礌瀵硅薄鐨勫睘鎬у彲浠ユ病鏈夌浉搴旂殑getter鍜宻etter鏂规硶
	 *         --->鍙互浣跨敤java鍙嶅皠杩涜鑾峰彇private鍜宲rotected淇グ鐨勫睘鎬у��
	 * 
	 *         鈶�.list鍏冪礌瀵硅薄鐨勫璞＄殑姣忎釜灞炴�ч兘鍙互鎸囧畾鏄崌搴忚繕鏄檷搴�
	 *         -->浣跨敤2涓噸鍐欑殑鏂规硶(涓�涓柟娉曟弧瓒虫墍鏈夊睘鎬ч兘鎸夌収鍗囧簭(闄嶅簭)锛屽彟澶栦竴涓柟娉曟弧瓒虫瘡涓睘鎬ч兘鑳芥寚瀹氭槸鍗囧簭(闄嶅簭))
	 * 
	 * 
	 */
	/**
	 * 瀵筶ist鐨勫厓绱犳寜鐓у涓睘鎬у悕绉版帓搴�,
	 * list鍏冪礌鐨勫睘鎬у彲浠ユ槸鏁板瓧锛坆yte銆乻hort銆乮nt銆乴ong銆乫loat銆乨ouble绛夛紝鏀寔姝ｆ暟銆佽礋鏁般��0锛夈�乧har銆丼tring銆乯ava.util.Date
	 * 
	 * 
	 * @param lsit
	 * @param sortname
	 *            list鍏冪礌鐨勫睘鎬у悕绉�
	 * @param isAsc
	 *            true鍗囧簭锛宖alse闄嶅簭
	 */
	public static <E> void sort(List<E> list, final boolean isAsc, final String... sortnameArr) {
		Collections.sort(list, new Comparator<E>() {

			public int compare(E a, E b) {
				int ret = 0;
				try {
					for (int i = 0; i < sortnameArr.length; i++) {
						ret = ListUtils.compareObject(sortnameArr[i], isAsc, a, b);
						if (0 != ret) {
							break;
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return ret;
			}
		});
	}

	/**
	 * 缁檒ist鐨勬瘡涓睘鎬ч兘鎸囧畾鏄崌搴忚繕鏄檷搴�
	 * 
	 * @param list
	 * @param sortnameArr
	 *            鍙傛暟鏁扮粍
	 * @param typeArr
	 *            姣忎釜灞炴�у搴旂殑鍗囬檷搴忔暟缁勶紝 true鍗囧簭锛宖alse闄嶅簭
	 */

	public static <E> void sort(List<E> list, final String[] sortnameArr, final boolean[] typeArr) {
		if (sortnameArr.length != typeArr.length) {
			throw new RuntimeException("灞炴�ф暟缁勫厓绱犱釜鏁板拰鍗囬檷搴忔暟缁勫厓绱犱釜鏁颁笉鐩哥瓑");
		}
		Collections.sort(list, new Comparator<E>() {
			public int compare(E a, E b) {
				int ret = 0;
				try {
					for (int i = 0; i < sortnameArr.length; i++) {
						ret = ListUtils.compareObject(sortnameArr[i], typeArr[i], a, b);
						if (0 != ret) {
							break;
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				return ret;
			}
		});
	}

	/**
	 * 瀵�2涓璞℃寜鐓ф寚瀹氬睘鎬у悕绉拌繘琛屾帓搴�
	 * 
	 * @param sortname
	 *            灞炴�у悕绉�
	 * @param isAsc
	 *            true鍗囧簭锛宖alse闄嶅簭
	 * @param a
	 * @param b
	 * @return
	 * @throws Exception
	 */
	private static <E> int compareObject(final String sortname, final boolean isAsc, E a, E b) throws Exception {
		int ret;
		Object value1 = ListUtils.forceGetFieldValue(a, sortname);
		Object value2 = ListUtils.forceGetFieldValue(b, sortname);
		String str1 = value1.toString();
		String str2 = value2.toString();
		if (value1 instanceof Number && value2 instanceof Number) {
			int maxlen = Math.max(str1.length(), str2.length());
			str1 = ListUtils.addZero2Str((Number) value1, maxlen);
			str2 = ListUtils.addZero2Str((Number) value2, maxlen);
		} else if (value1 instanceof Date && value2 instanceof Date) {
			long time1 = ((Date) value1).getTime();
			long time2 = ((Date) value2).getTime();
			int maxlen = Long.toString(Math.max(time1, time2)).length();
			str1 = ListUtils.addZero2Str(time1, maxlen);
			str2 = ListUtils.addZero2Str(time2, maxlen);
		}
		if (isAsc) {
			ret = str1.compareTo(str2);
		} else {
			ret = str2.compareTo(str1);
		}
		return ret;
	}

	/**
	 * 缁欐暟瀛楀璞℃寜鐓ф寚瀹氶暱搴﹀湪宸︿晶琛�0.
	 * 
	 * 浣跨敤妗堜緥: addZero2Str(11,4) 杩斿洖 "0011", addZero2Str(-18,6)杩斿洖 "-000018"
	 * 
	 * @param numObj
	 *            鏁板瓧瀵硅薄
	 * @param length
	 *            鎸囧畾鐨勯暱搴�
	 * @return
	 */
	public static String addZero2Str(Number numObj, int length) {
		NumberFormat nf = NumberFormat.getInstance();
		// 璁剧疆鏄惁浣跨敤鍒嗙粍
		nf.setGroupingUsed(false);
		// 璁剧疆鏈�澶ф暣鏁颁綅鏁�
		nf.setMaximumIntegerDigits(length);
		// 璁剧疆鏈�灏忔暣鏁颁綅鏁�
		nf.setMinimumIntegerDigits(length);
		return nf.format(numObj);
	}

	/**
	 * 鑾峰彇鎸囧畾瀵硅薄鐨勬寚瀹氬睘鎬у�硷紙鍘婚櫎private,protected鐨勯檺鍒讹級
	 * 
	 * @param obj
	 *            灞炴�у悕绉版墍鍦ㄧ殑瀵硅薄
	 * @param fieldName
	 *            灞炴�у悕绉�
	 * @return
	 * @throws Exception
	 */
	public static Object forceGetFieldValue(Object obj, String fieldName) throws Exception {
		Field field = obj.getClass().getDeclaredField(fieldName);
		Object object = null;
		boolean accessible = field.isAccessible();
		if (!accessible) {
			// 濡傛灉鏄痯rivate,protected淇グ鐨勫睘鎬э紝闇�瑕佷慨鏀逛负鍙互璁块棶鐨�
			field.setAccessible(true);
			object = field.get(obj);
			// 杩樺師private,protected灞炴�х殑璁块棶鎬ц川
			field.setAccessible(accessible);
			return object;
		}
		object = field.get(obj);
		return object;
	}
}
