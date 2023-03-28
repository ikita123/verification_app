export const regex = {
        namePattern:"^[a-zA-Z0-9 ]*$",
        emailPattern:"^[a-zA-Z0-9][-a-zA-Z0-9._]+@([-a-zA-Z0-9]+[.])+[a-z]{2,5}$",
        panCardPattern:"[A-Z]{5}[0-9]{4}[A-Z]{1}",
        phoneNumberPattern:"^((\\+91-?)|0)?[0-9]{10}$",
        onlyNumber:"^[0-9]*$",
        NumberDecimalallow:"[+-]?([0-9]*[.])?[0-9]+",
        aadharNumber:"^[0-9]{12 | 16}*$",
        aalphaNumeric:"^[a-zA-Z0-9_]*$",
        nonSpecialCharacter:"^[-_ a-zA-Z0-9]+$",
        fileNameRegex: "^[-_ \{\}\(\)0-9a-zA-Z\.]+\.[A-Za-z0-9]{1,4}$",
        photoVerifynumberOne:1000,
        photoVerifynumberTwo:9000,
        latlongRegex : "^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$",
        defaultPageNumber:1,
        itemPerPage:10,
        emailLength:"(?=^.{1,150}$)",
        maxOneThousandPattern:"^$|^([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|1000)?",
        alphanumericalspeccial:"/^[ A-Za-z0-9_@./#&+-]*$/"
}