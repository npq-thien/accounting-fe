export const validationMessages = {
    required: "Trường này bắt buộc",
    min: (min: number) => `Trường này phải có ít nhất ${min} ký tự`,
    max: (max: number) => `Trường này chỉ có nhiều nhất ${max} ký tự`,
    email: "Địa chỉ email không hợp lệ",
    phone: "Số điện thoại không hợp lệ",
    password: "Mật khẩu không hợp lệ",
    integer: "Giá trị phải là số nguyên",
    positive: "Giá trị phải là số dương",
} as const;
