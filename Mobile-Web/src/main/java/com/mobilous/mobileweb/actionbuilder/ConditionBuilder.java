package com.mobilous.mobileweb.actionbuilder;

import java.util.ArrayList;

import com.mobilous.mobileweb.etc.Case;
import com.mobilous.mobileweb.etc.Condition;
import com.mobilous.mobileweb.etc.GroupCase;
import com.mobilous.mobileweb.ui.BaseView;

public class ConditionBuilder {
    private static int groupCasesIndex =0;
	public static String setCondition(Condition condition, BaseView baseview) {
		StringBuffer condStr = new StringBuffer("");
		String operator = "";
		if (condition == null)
			return "";
		condStr.append(",condition:{");
		if (condition.getCondTemp().length() <= 0) {
			if (condition.getGroupCases().size() > 0) {
				if (condition.getGroupCases().get(0).getCases().get(0)
						.getTarget() != "") {
					writeCondition(condition, condStr, operator);
				} else if (condition.getGroupCases().get(0).getCases().get(0)
						.getGroupCases().size() > 0) {
					writeCondition(condition, condStr, operator);
				}

			}
		}
		condStr.append("}");
		return condStr.toString();
	}

	private static void writeCondition(Condition condition,
			StringBuffer condStr, String operator) {
		int groupcaseindex = 0;
		condStr.append("groupcases:{");
		for (GroupCase groupCase : condition.getGroupCases()) {
			condStr.append("groupcase_" + groupcaseindex + ":{");
			if (groupCase.getCases().size() > 0) {
				int caseindex = 0;
				for (Case caseObj : groupCase.getCases()) {

					if (caseObj.getGroupCases().size() > 0) {
						condStr.append(ConditionBuilder.setORGroupCase(caseObj
								.getGroupCases()));
					}
					if ((!caseObj.getTarget().equalsIgnoreCase(""))
							|| !(caseObj.getValue().equalsIgnoreCase(""))) {

						condStr.append("case_" + caseindex + ":{");
						if ((caseObj.getTarget() == "")
								|| (caseObj.getValue() == "")) {
						}
						// return "";
						if (caseObj.getOperator().equalsIgnoreCase("G"))
							operator = " > ";
						else if (caseObj.getOperator().equalsIgnoreCase("L"))
							operator = " < ";
						else if (caseObj.getOperator().equalsIgnoreCase("E"))
							operator = " == ";
						else if (caseObj.getOperator().equalsIgnoreCase("NE"))
							operator = " != ";
						else if (caseObj.getOperator().equalsIgnoreCase("LE"))
							operator = " <= ";
						else if (caseObj.getOperator().equalsIgnoreCase("GE"))
							operator = " >= ";

						condStr.append("operator:\'").append(operator)
								.append("\',").append("value:\'");
						if (caseObj.getValue().equalsIgnoreCase("__BLANK__")) {
							condStr.append("").append("\',");
						} else {
							condStr.append(caseObj.getValue()).append("\',");
						}
						condStr.append("target:\'").append(caseObj.getTarget())
								.append("\'");
						condStr.append("},");
						caseindex++;
					}
				}
			}
			condStr.append("},");
			groupcaseindex++;
		}
		condStr.append("},");
	}

	public static String setORGroupCase(ArrayList<GroupCase> groupCases) {
		StringBuffer condStr = new StringBuffer("");
		String operator = "";
		if (groupCases.size() > 0) {
			int groupcaseindex = 0;
			condStr.append("groupcases_"+ groupCasesIndex +":{");
			groupCasesIndex++;
			for (GroupCase groupCase : groupCases) {
				condStr.append("groupcase_" + groupcaseindex + ":{");
				if (groupCase.getCases().size() > 0) {
					int caseindex = 0;
					for (Case caseObj : groupCase.getCases()) {

						if (caseObj.getGroupCases().size() > 0) {
							condStr.append(ConditionBuilder
									.setORGroupCase(caseObj.getGroupCases()));
						}

						condStr.append("case_" + caseindex + ":{");
						if ((caseObj.getTarget() == "")
								|| (caseObj.getValue() == "")) {
						}
						// return "";
						if (caseObj.getOperator().equalsIgnoreCase("G"))
							operator = " > ";
						else if (caseObj.getOperator().equalsIgnoreCase("L"))
							operator = " < ";
						else if (caseObj.getOperator().equalsIgnoreCase("E"))
							operator = " == ";
						else if (caseObj.getOperator().equalsIgnoreCase("NE"))
							operator = " != ";
						else if (caseObj.getOperator().equalsIgnoreCase("LE"))
							operator = " <= ";
						else if (caseObj.getOperator().equalsIgnoreCase("GE"))
							operator = " >= ";

						condStr.append("operator:\'").append(operator)
								.append("\',").append("value:\'");
						if (caseObj.getValue().equalsIgnoreCase("__BLANK__")) {
							condStr.append("").append("\',");
						} else {
							condStr.append(caseObj.getValue()).append("\',");
						}
						condStr.append("target:\'").append(caseObj.getTarget())
								.append("\'");
						condStr.append("},");
						caseindex++;

					}
				}
				condStr.append("},");
				groupcaseindex++;
			}
			condStr.append("},");
		}
		return condStr.toString();
	}
}
