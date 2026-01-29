import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, HelpCircle } from 'lucide-react';

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FAQContent locale={locale} />;
}

function FAQContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const faqs = [
    {
      q: isKorean ? '어떤 진영을 선택해야 하나요?' : 'Nên chọn phe nào?',
      a: isKorean
        ? '새벽의 날개를 권장합니다. 서버의 약 70%가 블러드 로즈를 선택하기 때문에, 새벽의 날개 선택 시 카운터 이점을 얻을 수 있습니다. 카운터 시스템: 새벽의 날개 > 블러드 로즈 > 질서의 수호자 > 새벽의 날개.'
        : 'Khuyến nghị Cánh Bình Minh. Khoảng 70% server chọn Blood Rose, nên chọn Cánh Bình Minh có lợi thế counter. Hệ thống counter: Cánh Bình Minh > Blood Rose > Người Bảo Vệ Trật Tự > Cánh Bình Minh.',
    },
    {
      q: isKorean ? '가속 아이템은 언제 사용해야 하나요?' : 'Khi nào nên dùng tăng tốc?',
      a: isKorean
        ? '연맹 대결 테마에 맞춰 사용하세요. 연맹 대결은 7일 연속 이벤트로 6개 테마가 순환합니다. 건물 업그레이드 날: 건설가속, 과학의 시대 날: 연구가속, 종합 성장 날: 훈련가속. Full Preparedness와 겹칠 때 활동하면 보상 2배!'
        : 'Dùng theo theme Alliance Duel. AD là sự kiện 7 ngày liên tục với 6 theme xoay vòng. Shelter Upgrade: tăng tốc xây, Age of Science: tăng tốc NC, Holistic Growth: tăng tốc HL. Khi trùng Full Prep = thưởng gấp đôi!',
    },
    {
      q: isKorean ? '소피아(Sophia)를 왜 키워야 하나요?' : 'Tại sao phải nuôi Sophia?',
      a: isKorean
        ? '소피아 5성 달성 시 건설 비용 10% 감소 + 건설 속도 증가 효과를 얻습니다. 장기적으로 수십억 자원을 절약할 수 있어 무과금/소과금 필수 영웅입니다.'
        : 'Sophia 5 sao giảm 10% chi phí xây dựng + tăng tốc độ xây. Dài hạn tiết kiệm hàng tỷ tài nguyên, là anh hùng bắt buộc cho F2P/light spender.',
    },
    {
      q: isKorean ? '자원 생산 건물을 업그레이드해야 하나요?' : 'Có nên nâng cấp công trình sản xuất?',
      a: isKorean
        ? '아니요! 농장, 거주지, 풍력발전기, 제련소는 ROI가 매우 낮습니다. 투자 자원 회수에 4개월 이상 소요되므로 스킵하고 HQ/연구소에 집중하세요.'
        : 'Không! Nông trại, Khu dân cư, Turbine gió, Xưởng luyện kim có ROI rất thấp. Mất 4+ tháng thu hồi đầu tư, bỏ qua và tập trung HQ/Lab.',
    },
    {
      q: isKorean ? '연구 우선순위는 어떻게 되나요?' : 'Ưu tiên NC như thế nào?',
      a: isKorean
        ? '1) 연맹 인정(AR) 완료 - 일일 보상 2배, 2) Hero Training은 Cockpit까지만, 3) Military Strategies의 HP 연구 집중, 4) 두 번째 연구소 구매 필수.'
        : '1) Hoàn thành AR - gấp đôi thưởng hàng ngày, 2) Hero Training chỉ tới Cockpit, 3) Tập trung NC HP trong Military Strategies, 4) Bắt buộc mua Lab thứ 2.',
    },
    {
      q: isKorean ? '영웅은 몇 명을 키워야 하나요?' : 'Nên nuôi bao nhiêu anh hùng?',
      a: isKorean
        ? '메인 진형 5명에만 집중 투자하세요. 모든 영웅을 고르게 키우면 자원 낭비입니다. 서포트 영웅은 4성까지만 키워 4번째 스킬을 해금하세요.'
        : 'Chỉ tập trung đầu tư 5 anh hùng chính. Nuôi đều tất cả là lãng phí tài nguyên. Anh hùng hỗ trợ chỉ nuôi tới 4 sao để mở skill thứ 4.',
    },
    {
      q: isKorean ? '장비는 어떻게 업그레이드하나요?' : 'Nâng cấp trang bị như thế nào?',
      a: isKorean
        ? '오렌지 장비에만 투자하세요. 1) Lv.20까지 강화 → 2) 1헥사곤 승급 (100코어, 최고 효율) → 3) 모든 장비 고르게 2성, 3성, 4성 순으로. F2P는 4헥사곤에서 멈춤.'
        : 'Chỉ đầu tư trang bị cam. 1) Nâng lên Lv.20 → 2) Thăng 1 hexagon (100 core, hiệu quả nhất) → 3) Nâng đều tất cả 2 sao, 3 sao, 4 sao. F2P dừng ở 4 hexagon.',
    },
    {
      q: isKorean ? '퓨리로드는 어떻게 공격하나요?' : 'Tấn công Furylord như thế nào?',
      a: isKorean
        ? '매일 4회 (00/06/12/18시), 일요일 제외. 연료가 없어도 공격 가능합니다! 300만 데미지 누적 시 보라 장비가 해금됩니다.'
        : '4 lần/ngày (00/06/12/18h), trừ CN. Có thể tấn công dù không có nhiên liệu! Tích lũy 3M damage mở trang bị tím.',
    },
    {
      q: isKorean ? '다이아몬드는 어디에 사용해야 하나요?' : 'Nên dùng diamond vào đâu?',
      a: isKorean
        ? '두 번째 연구소 구매가 최우선입니다 (연구 속도 2배). 그 다음 VIP 레벨업, 메인 영웅 조각 순으로 사용하세요.'
        : 'Mua Lab thứ 2 là ưu tiên nhất (gấp đôi tốc độ NC). Sau đó lên VIP level, rồi mảnh anh hùng chính.',
    },
    {
      q: isKorean ? '연맹 가입이 중요한가요?' : 'Gia nhập liên minh có quan trọng không?',
      a: isKorean
        ? '매우 중요합니다! 활동적인 연맹은 건설 도움, 연맹 상점, 연맹 대결 보상, 랠리 참여 등 성장에 필수적인 혜택을 제공합니다. 비활성 연맹에 있다면 즉시 이동하세요.'
        : 'Rất quan trọng! LM hoạt động cung cấp hỗ trợ xây dựng, shop LM, thưởng Alliance Duel, tham gia rally - thiết yếu cho phát triển. Nếu ở LM không hoạt động, chuyển ngay.',
    },
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <HelpCircle className="h-8 w-8 text-highlight" />
            {isKorean ? '자주 묻는 질문 (FAQ)' : 'Câu hỏi thường gặp (FAQ)'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '자주 묻는 질문과 답변을 정리했습니다.'
              : 'Tổng hợp các câu hỏi và trả lời thường gặp.'}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">
                    Q
                  </span>
                  <div className="space-y-2">
                    <p className="font-semibold">{faq.q}</p>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
