import { Check, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

function Upgrade() {
  const faqData = [
    {
      question: "SoundWave là gì?",
      answer:
        "SoundWave: Nền Tảng Âm Nhạc Trực Tuyến Đỉnh Cao\n\nSoundWave mang đến cho bạn trải nghiệm nghe nhạc tuyệt vời với kho nhạc phong phú và chất lượng cao. Tại đây, bạn sẽ khám phá được đa dạng thể loại âm nhạc, từ pop, rock, đến EDM, với nội dung liên tục được cập nhật.",
    },
    {
      question: "Bản dùng thử SoundWave Plus hoạt động như thế nào?",
      answer:
        "Nếu bạn chưa từng trải nghiệm gói Premium của SoundWave, giờ là cơ hội tuyệt vời để bạn dùng thử miễn phí hoặc nhận ưu đãi đặc biệt!\n\nKhi đăng ký dùng thử, bạn sẽ cần cung cấp thông tin thanh toán. Điều này giúp chúng tôi xác định đúng quốc gia hoặc khu vực của bạn, đồng thời xử lý thanh toán nếu bạn quyết định tiếp tục sử dụng gói Premium sau khi hết thời gian ưu đãi.\n\nChúng tôi sẽ nhắc nhở bạn trước 7 ngày khi thời gian dùng thử sắp kết thúc. Xin lưu ý rằng các Điều khoản và giới hạn sẽ được áp dụng tùy theo từng quốc gia. Đừng bỏ lỡ cơ hội khám phá kho nhạc phong phú của SoundWave ngay hôm nay!",
    },
    {
      question: "Làm cách nào để hủy gói SoundWave Plus/Premium?",
      answer:
        "Bạn có thể hủy đăng ký gói Premium bất cứ lúc nào từ trang quản lý tài khoản của mình. Gói Premium hiện tại của bạn sẽ tiếp tục hoạt động cho đến khi kết thúc chu kỳ thanh toán hiện tại. Sau đó, tài khoản sẽ tự động chuyển sang gói dịch vụ miễn phí. Mọi danh sách phát và bài hát yêu thích của bạn sẽ vẫn được lưu giữ, tuy nhiên, khi sử dụng gói miễn phí, bạn có thể sẽ gặp phải một số quảng cáo trong quá trình thưởng thức nhạc. ",
    },
    {
      question: "Cách thức liên hệ của SoundWave?",
      answer:
        "Để được hỗ trợ, vui lòng liên hệ với chúng tôi qua đường link này hoặc gửi tin nhắn đến số điện thoại Zalo 0787559037",
    },
  ];
  const [openIndex, setOpenIndex] = useState(0);
  const [showPricingPage, setShowPricingPage] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const features = [
    "Nghe nhạc không quảng cáo",
    "Kho nhạc Premium",
    "Phát nhạc theo thứ tự bất kỳ",
    "Chất lượng âm thanh cao",
    "Tải xuống để nghe offline",
    "Sắp xếp danh sách chờ nghe",
    "Tải lên bài hát của bạn",
  ];

  const plans = [
    {
      name: "BASIC",
      color: "bg-gray-600",
      features: [false, false, true, false, false, false, false],
    },
    {
      name: "PLUS",
      color: "bg-yellow-500",
      features: [true, false, false, true, true, true, false],
    },
    {
      name: "PREMIUM",
      color: "bg-pink-600",
      features: [true, true, false, true, true, true, true],
    },
  ];
  const handleUpgradeClick = () => {
    setShowPricingPage(true);
  };
  const planss = [
    {
      duration: 12,
      price: 156000,
      originalPrice: 264000,
      discount: 40,
      perMonth: 13000,
    },
    {
      duration: 6,
      price: 90000,
      originalPrice: 132000,
      discount: 30,
      perMonth: 15000,
    },
    {
      duration: 3,
      price: 57000,
      originalPrice: 84000,
      discount: 20,
      perMonth: 19000,
    },
    {
      duration: 1,
      price: 22000,
      originalPrice: 22000,
      discount: 0,
      perMonth: 22000,
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null); // Không chọn gói nào ban đầu
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    if (agreed && selectedPlan !== null) {
      console.log(`Selected plan: ${planss[selectedPlan].duration} months`);
      // Ở đây bạn có thể thêm logic để bắt đầu quá trình thanh toán
    }
  };

  const handleCancel = () => {
    setSelectedPlan(null); // Đặt lại trạng thái gói được chọn
    setAgreed(false); // Bỏ chọn checkbox đồng ý
    setShowPricingPage(false);
  };

  const handleWheelEvent = (e) => {
    e.preventDefault();
  };

  // Use Effect to add the wheel event listener
  useEffect(() => {
    if (showPricingPage) {
      window.addEventListener("wheel", handleWheelEvent, { passive: false });
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("wheel", handleWheelEvent);
    };
  }, [showPricingPage]); // Trigger the effect when showPricingPage changes

  return (
    <>
      <div
        className={` bg-slate-900 text-white h-auto flex flex-col items-center justify-center px-4 pt-28 pb-56 tracking-wide  ${
          showPricingPage ? " blur-sm " : ""
        }`}
      >
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl md:text-5xl font-bold text-center mb-4 ">
            Nâng cấp tài khoản để trải nghiệm các đặt quyền và lợi ích cao cấp
          </h1>
          <p className="text-center text-gray-400 mb-2 text-sm">
            65.000 đ/tháng • Không bao gồm thuế GTGT • Hủy bất cứ lúc nào
          </p>
          <div className="text-center my-12">
            <button className="bg-gradient-to-r from-[#FF553E] to-[#FF0065] hover:opacity-90  text-white   py-2 px-6 rounded-full">
              Thử 7 ngày miễn phí
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mb-8">
            7 ngày dùng thử miễn phí, hủy bất cứ lúc nào
            <br />
            Chúng tôi sẽ nhắc bạn trước khi hết hạn dùng thử.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="bg-[#212121] rounded-lg px-6 pt-14 pb-6 flex flex-col items-center relative h-[450px]">
              <div className="text-white text-xs mb-2 absolute top-0 py-1 px-8 bg-[#757575] rounded-lg font-bold -translate-y-1/2">
                BASIC
              </div>
              <h3 className="text-xl font-bold mb-2">Miễn Phí</h3>
              <p className="text-xs text-gray-400 mb-4">Miễn phí trọn đời</p>
              <p className="text-2xl text-white mb-8 mt-auto ">
                <span className="text-2xl font-medium">0đ</span> /tháng
              </p>
              <button className=" w-full bg-[#212121] border-2 border-slate-700  text-slate-400 hover:text-slate-300 hover:border-slate-300 py-2 px-4 rounded-full duration-300">
                Gói hiện tại
              </button>
            </div>
            <div className="bg-[#212121] rounded-lg px-6 pt-14 pb-6  flex flex-col items-center  relative h-[450px]">
              <div className="text-white text-xs mb-2 absolute top-0 py-1 px-8 bg-yellow-500 rounded-lg font-bold -translate-y-1/2">
                PLUS
              </div>
              <h3 className="text-xl font-bold mb-2">Plus SoundWave</h3>
              <ul className="text-xs space-y-1 mb-4">
                <li>✓ Nghe nhạc không quảng cáo</li>
                <li>✓ Tải xuống để nghe offline</li>
                <li>✓ Chất lượng âm thanh cao</li>
                <li>✓ Phát nhạc theo danh sách tự chọn</li>
                <li>✓ Sắp xếp danh sách phát</li>
              </ul>
              <p className="text-2xl text-white mb-8 mt-auto ">
                <span className="text-2xl font-medium">19.000đ</span> /tháng
              </p>
              <button
                onClick={handleUpgradeClick}
                className=" cursor-pointer w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full border-slate-400 border"
              >
                Nâng Cấp Ngay
              </button>
            </div>
            <div className="bg-[#212121] rounded-lg px-6 pt-14 pb-6  flex flex-col items-center relative h-[450px]">
              <div className="text-white text-sm mb-2 absolute top-0 py-1 px-8 bg-pink-400 rounded-lg font-bold -translate-y-1/2">
                PREMIUM
              </div>
              <h3 className="text-xl font-bold mb-2">SoundWave Premium</h3>
              <ul className="text-xs space-y-1 mb-4">
                <li>✓ Nghe nhạc không quảng cáo</li>
                <li>✓ Kho nhạc Premium</li>
                <li>✓ Phát nhạc theo danh sách tự chọn</li>
                <li>✓ Chất lượng âm thanh cao</li>
                <li>✓ Tải xuống để nghe offline</li>
                <li>✓ Đăng bài hát của bạn</li>
              </ul>
              <p className="text-2xl text-red-600 mb-8 mt-auto ">
                <span className="text-2xl font-medium">39.000đ</span> /tháng
              </p>
              <button
                onClick={handleUpgradeClick}
                className=" cursor-pointer w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full border-slate-400 border"
              >
                Nâng Cấp Ngay
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl w-full mt-36">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Đặc Quyền Khi Nâng Cấp
          </h1>
          <div className="bg-[#212121] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="p-4 text-left text-sm">
                    Đặc quyền và lợi ích dành cho bạn
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.name} className="p-4 text-center">
                      <span
                        className={`inline-block ${plan.color} text-white px-6 py-1 rounded-lg text-xs`}
                      >
                        {plan.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-slate-700">
                    <td className="p-4 text-sm text-slate-400">{feature}</td>
                    {plans.map((plan, planIndex) => (
                      <td
                        key={`${plan.name}-${index}`}
                        className="p-4 text-center"
                      >
                        {plan.features[index] ? (
                          <Check
                            className="inline-block text-green-500"
                            size={20}
                          />
                        ) : (
                          <X className="inline-block text-red-500" size={20} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="max-w-4xl w-full pt-28">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            Bạn có câu hỏi?
          </h1>
          <p className="text-center text-gray-400 mb-2">
            Chúng tôi sẵn lòng giải đáp.
          </p>
          <p className="text-center text-gray-400 mb-8">
            Tìm thêm câu trả lời trên trang hỗ trợ của chúng tôi.
          </p>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-[#212121] rounded-lg overflow-hidden"
              >
                <button
                  className="w-full p-4 text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{item.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-[#212121] border-t border-white ">
                    <p className="text-slate-400 whitespace-pre-line">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPricingPage ? (
        <div className="fixed top-0 bottom-0 right-0 left-0 h-screen">
          <div className="min-h-screen  text-white flex items-center justify-center p-4 -translate-y-7">
            <div className="max-w-2xl w-full bg-slate-800 rounded-lg p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Plus SoundWave</h2>
                <p className="text-slate-400 text-sm">
                  Thanh toán trước một lần, hợp lệ khi bạn muốn. Không tự động
                  gia hạn.
                </p>
              </div>

              {planss.map((plan, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer ${
                    selectedPlan === index ? "bg-purple-900" : "bg-slate-700"
                  }`}
                  onClick={() => setSelectedPlan(index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        SoundWave Plus - {plan.duration} tháng
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-medium">
                          {plan.price.toLocaleString()}đ
                        </span>
                        {plan.discount > 0 && (
                          <>
                            <span className="text-slate-400 line-through text-sm">
                              {plan.originalPrice.toLocaleString()}đ
                            </span>
                            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-md">
                              Giảm đến {plan.discount}%
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">
                        Tương đương với {plan.perMonth.toLocaleString()}đ/tháng
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedPlan === index
                          ? "border-pink-500 bg-pink-500"
                          : "border-slate-500"
                      }`}
                    >
                      {/* {selectedPlan === index && <CheckCircle2 className="text-white" size={22} />} */}
                    </div>
                  </div>
                </div>
              ))}

              <hr className="border-none h-[1px] bg-slate-500" />

              <div className="flex ">
                <div className="flex flex-1 items-start space-x-2">
                  <input
                    type="checkbox"
                    id="agree"
                    className="mt-1"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="agree" className="text-sm text-slate-400">
                    Khi nhấn Thanh toán, bạn đã đồng ý với{" "}
                    <span className="text-white font-medium">
                      Chính sách thanh toán
                    </span>{" "}
                    của chúng tôi.
                  </label>
                </div>

                <div className="flex flex-1 justify-end">
                  <button
                    className="px-6 py-2 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors"
                    onClick={handleCancel} // Sự kiện hủy bỏ
                  >
                    Hủy bỏ
                  </button>
                  <button
                    className={`px-6 py-2 ml-6 rounded-full transition-colors ${
                      agreed && selectedPlan !== null
                        ? "bg-pink-600 hover:bg-pink-700"
                        : "bg-slate-700 cursor-not-allowed"
                    }`}
                    disabled={!agreed || selectedPlan === null} // Vô hiệu hóa nếu chưa chọn gói hoặc chưa đồng ý
                    onClick={handleContinue} // Sự kiện tiếp tục
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : null}
    </>
  );
}

export default Upgrade;
