const allProduct = [
    {
        name: "Honda CBR150R",
        price: "73.000.000đ",
        description: "Động cơ DOHC 150cc đầy uy lực",
        tag: "Xe côn tay",
        image: "../assets/image/cbr150r.png",
        linkProduct: "chi-tiet.html?name=Honda%20CBR150R",
        details: {
            dongCo: "150cc DOHC, làm mát bằng dung dịch",
            hopSo: "Côn tay, 6 cấp",
            nhienLieu: "Xăng",
            khoiDong: "Điện",
            phanKhuc: "Sportbike cỡ nhỏ",
            phuHop: "Người thích xe thể thao, đi phố và chạy tour ngắn"
        }
    },

    {
        name: "Honda Winner R",
        price: "50.000.000đ",
        description: "Động cơ DOHC 150cc hiệu suất cao",
        tag: "Xe côn tay",
        image: "../assets/image/winnerr.png",
        linkProduct: "chi-tiet.html?name=Honda%20Winner%20R",
        details: {
            dongCo: "150cc DOHC, làm mát bằng dung dịch",
            hopSo: "Côn tay, 6 cấp",
            nhienLieu: "Xăng",
            khoiDong: "Điện",
            phanKhuc: "Xe underbone thể thao",
            phuHop: "Di chuyển hằng ngày, đi làm và đi xa trong điều kiện đô thị"
        }
    },

    {
        name: "Honda Air Blade 150",
        price: "50.000.000đ",
        description: "Động cơ êm ái, tiết kiệm nhiên liệu",
        tag: "Xe tay ga",
        image: "../assets/image/airblade150.png",
        linkProduct: "chi-tiet.html?name=Honda%20Air%20Blade%20150",
        details: {
            dongCo: "150cc, phun xăng điện tử",
            hopSo: "Tự động vô cấp CVT",
            nhienLieu: "Xăng",
            khoiDong: "Điện",
            phanKhuc: "Xe tay ga thể thao",
            phuHop: "Người cần xe tay ga mạnh mẽ, linh hoạt cho đô thị"
        }
    },

{
    name: "Wave Alpha 110",
    price: "15.000.000đ",
    description: "Xe số tự động tiết kiệm xăng",
    tag: "Xe số",
    image: "../assets/image/wavealpha110.png",
    linkProduct: "chi-tiet.html?name=Wave%20Alpha%20110",
    details: {
        dongCo: "110cc, tiết kiệm nhiên liệu",
        hopSo: "Bán tự động, 4 cấp",
        nhienLieu: "Xăng",
        khoiDong: "Điện",
        phanKhuc: "Xe số phổ thông",
        phuHop: "Người cần xe bền, dễ đi, chi phí sử dụng thấp"
    }
},

{
    name: "Honda Vision",
    price: "32.000.000đ",
    description: "Xe tay ga nhập khẩu nguyên chiếc",
    tag: "Xe tay ga",
    image: "../assets/image/hondavision.png",
    linkProduct: "chi-tiet.html?name=Honda%20Vision",
    details: {
        dongCo: "110cc eSP, phun xăng điện tử",
        hopSo: "Tự động vô cấp CVT",
        nhienLieu: "Xăng",
        khoiDong: "Điện",
        phanKhuc: "Xe tay ga đô thị",
        phuHop: "Người cần xe gọn nhẹ, dễ lái và tiết kiệm nhiên liệu"
    }
},

{
    name: "Honda Wave RSX 110",
    price: "22.000.000đ",
    description: "Êm ái,tiết kiệm nhiên liệu",
    tag: "Xe số",
    image: "../assets/image/waversx.png",
    linkProduct: "chi-tiet.html?name=Honda%20Wave%20RSX%20110",
    details: {
        dongCo: "110cc, phun xăng điện tử",
        hopSo: "Bán tự động, 4 cấp",
        nhienLieu: "Xăng",
        khoiDong: "Điện",
        phanKhuc: "Xe số thể thao",
        phuHop: "Người cần xe số nhẹ, bền và tiết kiệm"
    }
},

{
    name: "Honda Future 125 Fi",
    price: "185.000.000đ",
    description: "Động cơ 125cc mạnh mẽ, thiết kế hiện đại",
    tag: "Xe số",
    image: "../assets/image/future125.png",
    linkProduct: "chi-tiet.html?name=Honda%20Future%20125%20Fi",
    details: {
        dongCo: "125cc Fi, phun xăng điện tử",
        hopSo: "Bán tự động, 4 cấp",
        nhienLieu: "Xăng",
        khoiDong: "Điện",
        phanKhuc: "Xe số trung cấp",
        phuHop: "Người cần xe bền bỉ, kiểu dáng lịch lãm"
    }
},

{
    name: "Honda Super Cub C125",
    price: "88.000.000đ",
    description: "Động cơ 125cc cơ bản với thiết kế đơn giản",
    tag: "Xe số",
    image: "../assets/image/supercubc125.png",
    linkProduct: "chi-tiet.html?name=Honda%20Super%20Cub%20C125",
    details: {
        dongCo: "125cc, phun xăng điện tử",
        hopSo: "Bán tự động, 4 cấp",
        nhienLieu: "Xăng",
        khoiDong: "Điện",
        phanKhuc: "Xe số cổ điển cao cấp",
        phuHop: "Người thích thiết kế hoài cổ, tinh gọn và cao cấp"
    }
},

{
    name: "Honda SH 160i",
    price: "95.000.000đ",
    description: "Xe tay ga cao cấp với công nghệ hiện đại",
    tag: "Xe tay ga",
    image: "../assets/image/sh160.png",
    linkProduct: "chi-tiet.html?name=Honda%20SH%20160i",
    details: {
        dongCo: "160cc eSP+, phun xăng điện tử",
        hopSo: "Tự động vô cấp CVT",
        nhienLieu: "Xăng",
        khoiDong: "Điện",
        phanKhuc: "Xe tay ga cao cấp",
        phuHop: "Người cần xe sang, công nghệ và khả năng vận hành mạnh"
    }
},

{
    name: "Honda Vario 150",
    price: "39.000.000đ",
    description: "Xe tay ga, hiệu suất ổn định",
    tag: "Xe tay ga",
    image: "../assets/image/variO150.png",
    linkProduct: "chi-tiet.html?name=Honda%20Vario%20150",
    details: {
        dongCo: "150cc, phun xăng điện tử",
        hopSo: "Tự động vô cấp CVT",
        nhienLieu: "Xăng",
        khoiDong: "Điện",
        phanKhuc: "Xe tay ga thể thao",
        phuHop: "Người cần xe linh hoạt, gọn và tiết kiệm"
    }
}
];