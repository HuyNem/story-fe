export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false;
    }
    return true;
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

export const slug = (name) => {
    const vietnameseChars = {
        'đ': 'd',
        // Thêm các ký tự tương tự tiếng Việt khác nếu cần
    };
    let str = name.toLowerCase();

    for (const char in vietnameseChars) {
        str = str.replace(new RegExp(char, 'g'), vietnameseChars[char]);
    }

    let str1 = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let str2 = str1.replace(/\s+/g, '-');
    return str2;
}
