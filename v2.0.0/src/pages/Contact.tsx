// Contact.tsx
import { useState } from "react";
import Layout from "../components/common/layout/Layout";
import { contactData, contactWarning } from "../constants/contact";
import { IoIosWarning } from "react-icons/io";

type formDataItem = {
  name: string;
  email: string;
  topic: string;
  messages: string;
};

const Contact = () => {
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const [formData, setFormData] = useState<formDataItem>({
    name: "",
    email: "",
    topic: "",
    messages: "",
  });

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({ name: "", email: "", topic: "", messages: "" });
    }
  };

  return (
    <Layout>
      <div className="bg-surface dark:bg-dark-surface">
        <div className="relative container py-6 z-[0]">
          <div className="home-header-light-blue dark:bg-[radial-gradient(closest-side_at_50%_50%,_#4b6cb7,_transparent)]" />
          <div className="home-header-light-pink dark:bg-[radial-gradient(closest-side_at_50%_50%,_#9b59b6,_transparent)]" />
          <div className="mt-[142px] md:mt-[162px] lg:mt-[182px]">
            {/* Tiêu đề contact */}
            <div className="my-12 md:my-20">
              <div className="max-w-4xl mx-auto flex flex-col items-center gap-4 border border-outline-variant dark:border-dark-outline-variant p-8 rounded-3xl shadow-navigation dark:shadow-xunit">
                <h1 className="text-5xl text-surface-on dark:text-dark-surface-on text-center font-bold">
                  Liên hệ với C4F-ISports
                </h1>
                <p className="max-w-2xl text-base text-surface-onVariant dark:text-dark-surface-onVariant text-center">
                  Cảm ơn bạn đã quan tâm đến C4F-ISports – nền tảng quản lý và đặt sân thể thao trực tuyến hiện đại. Chúng tôi luôn sẵn sàng lắng nghe mọi ý kiến đóng góp, phản hồi hoặc yêu cầu hỗ trợ từ phía người dùng, chủ sân và các đối tác tiềm năng.
                </p>
              </div>
            </div>
            {/* Thông tin liên hệ chính thức */}
            <div className="my-12 md:my-20">
              <div className="flex flex-col items-center">
                <h1 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-12 md:mb-16">
                  Thông tin liên hệ chính thức
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {contactData.map((item) => (
                    <div
                      key={item.id}
                      className="bg-surface-1 dark:bg-dark-surface-1 p-4 rounded-3xl flex items-start gap-4 border border-outline-variant dark:border-dark-outline-variant"
                    >
                      <div className="p-2 md:p-4 bg-primary-container dark:bg-dark-primary-container text-surface-on dark:text-dark-surface-on rounded-xl">
                        <item.icon className="text-xl md:text-2xl" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-lg md:text-xl text-surface-on dark:text-dark-surface-on font-medium">{item.title}</h1>
                        <h2 className="text-sm md:text-base text-surface-onVariant dark:text-dark-surface-onVariant">{item.name}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Gửi yêu cầu hoặc phản hồi */}
            <div className="my-12 md:my-20">
              <h1 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-6">
                Gửi yêu cầu phản hồi
              </h1>
              <p className="max-w-4xl mx-auto text-base text-center leading-loose text-surface-onVariant dark:text-dark-surface-onVariant mb-12 md:mb-16">
                Nếu bạn có câu hỏi, cần hỗ trợ kỹ thuật, góp ý cải tiến, hoặc muốn hợp tác phát triển nền tảng – vui lòng điền thông tin vào mẫu bên dưới
              </p>
              <div className="max-w-4xl mx-auto border border-outline-variant dark:border-dark-outline-variant p-10 rounded-3xl shadow-navigation dark:shadow-navigation-dark">
                <div className="flex flex-col gap-4">
                  {/* Họ tên */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-surface-onVariant dark:text-dark-surface-onVariant text-sm">
                      Họ tên đầy đủ
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChangeForm}
                      required
                      placeholder="Nguyen Van A"
                      className="outline-none text-surface-on dark:text-dark-surface-on px-1 py-2 rounded-sm bg-surface-1 dark:bg-dark-surface-1 border border-outline-variant dark:border-dark-outline-variant focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
                    />
                  </div>
                  {/* Địa chỉ email */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-surface-onVariant dark:text-dark-surface-onVariant text-sm">
                      Địa chỉ email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChangeForm}
                      required
                      placeholder="example123@gmail.com"
                      className="outline-none text-surface-on dark:text-dark-surface-on px-1 py-2 rounded-sm bg-surface-1 dark:bg-dark-surface-1 border border-outline-variant dark:border-dark-outline-variant focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
                    />
                  </div>
                  {/* Chủ đề liên hệ */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="topic" className="text-surface-onVariant dark:text-dark-surface-onVariant text-sm">
                      Chủ đề liên hệ
                    </label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChangeForm}
                      required
                      placeholder="Hỗ trợ kỹ thuật / Góp ý sản phẩm / Hợp tác phát triển / Khác..."
                      className="outline-none text-surface-on dark:text-dark-surface-on px-1 py-2 rounded-sm bg-surface-1 dark:bg-dark-surface-1 border border-outline-variant dark:border-dark-outline-variant focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
                    />
                  </div>
                  {/* Nội dung tin nhắn */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="messages" className="text-surface-onVariant dark:text-dark-surface-onVariant text-sm">
                      Nội dung tin nhắn
                    </label>
                    <textarea
                      name="messages"
                      value={formData.messages}
                      onChange={handleChangeForm}
                      placeholder="Nội dung cần liên hệ"
                      required
                      className="outline-none text-surface-on dark:text-dark-surface-on px-1 py-2 rounded-sm bg-surface-1 dark:bg-dark-surface-1 border border-outline-variant dark:border-dark-outline-variant focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary resize-none h-32"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-primary dark:bg-dark-primary px-8 py-2 rounded-3xl font-medium hover:bg-primary-shade dark:hover:bg-dark-primary-shade duration-200 transition-all ease-in-out text-surface-1 dark:text-dark-primary-on"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Lưu ý khi liên hệ */}
            <div className="my-12 md:my-20">
              <h1 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-12 md:mb-16">
                Lưu ý khi liên hệ
              </h1>
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col gap-4">
                  {contactWarning.map((item) => (
                    <div
                      key={item.id}
                      className="bg-surface-1 dark:bg-dark-surface-1 p-6 rounded-xl flex items-start md:items-center gap-4 border border-outline-variant dark:border-dark-outline-variant"
                    >
                      <div className="bg-primary-container dark:bg-dark-primary-container rounded-md p-2">
                        <IoIosWarning className="text-2xl text-surface-on dark:text-dark-surface-on" />
                      </div>
                      <h1 className="text-base text-surface-on dark:text-dark-surface-on">{item.title}</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Tìm chúng tôi trên bản đồ */}
            <div className="my-12 md:my-20">
              <h1 className="text-3xl md:text-5xl text-center text-surface-on dark:text-dark-surface-on font-bold mb-6">
                Tìm chúng tôi trên bản đồ
              </h1>
              <p className="max-w-4xl mx-auto text-base text-center leading-loose text-surface-onVariant dark:text-dark-surface-onVariant mb-12 md:mb-16">
                Bạn có thể tìm chúng tôi tại 48/3/3A Đ. Số 3, Trường Thọ, Thủ Đức, Hồ Chí Minh, Việt Nam
              </p>
              <div className="px-8">
                <div className="w-full h-[200px] md:h-[300px] lg:h-[350px] rounded-2xl overflow-hidden shadow-navigation dark:shadow-navigation-dark">
                  <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.685772993273!2d106.75874497451784!3d10.835341558105318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527ae7b121297%3A0x9fda1a8492c5074d!2zNDgvMy8zQSDEkC4gU-G7kSAzLCBUcsaw4budbmcgVGjhu40sIFRo4bunIMSQ4bupYywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1745858378946!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

