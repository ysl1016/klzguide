import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default async function BeginnerTipsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BeginnerTipsContent locale={locale} />;
}

function BeginnerTipsContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // 실제 lastzguides.com 기반 팁
  const tips = [
    {
      number: 1,
      title: isKorean ? '메인 영웅 5명에만 집중하세요' : 'Chỉ tập trung vào 5 anh hùng chính',
      desc: isKorean
        ? '자원을 모든 영웅에 분산하지 마세요. 메인 진형의 5명 영웅에만 집중 투자하는 것이 효율적입니다. 서포트 스킬 영웅은 최대 4성까지만 올리세요.'
        : 'Đừng phân tán tài nguyên cho tất cả anh hùng. Tập trung đầu tư vào 5 anh hùng trong đội hình chính. Anh hùng hỗ trợ chỉ nên lên tối đa 4 sao.',
      priority: 'high',
    },
    {
      number: 2,
      title: isKorean ? '진영 하나만 선택하세요' : 'Chỉ chọn một phe',
      desc: isKorean
        ? '블러디 로즈/새벽의 날개/질서의 수호자 중 하나만 선택하세요. 새벽의 날개(슈터)가 대부분 서버에서 블러디 로즈를 카운터하므로 추천됩니다.'
        : 'Chỉ chọn một trong Blood Rose/Cánh Bình Minh/Người Bảo Vệ Trật Tự. Cánh Bình Minh (Xạ thủ) được khuyến nghị vì counter Blood Rose phổ biến.',
      priority: 'high',
    },
    {
      number: 3,
      title: isKorean ? '가속 아이템은 연맹 대결 테마에 맞춰 사용' : 'Dùng tăng tốc theo theme Alliance Duel',
      desc: isKorean
        ? '연맹 대결은 7일 연속 이벤트로 6개 테마가 순환합니다. 건설 가속: 건물 업그레이드 날 / 연구 가속: 과학의 시대 날 / 훈련 가속: 종합 성장 날. 테마에 맞춰 사용하면 포인트를 극대화할 수 있습니다.'
        : 'Alliance Duel là sự kiện 7 ngày liên tục với 6 theme xoay vòng. Tăng tốc xây: ngày Shelter Upgrade / NC: ngày Age of Science / Huấn luyện: ngày Holistic Growth. Dùng đúng theme để tối đa điểm.',
      priority: 'high',
    },
    {
      number: 4,
      title: isKorean ? '자원 생산 건물은 스킵하세요' : 'Bỏ qua công trình sản xuất tài nguyên',
      desc: isKorean
        ? '농장, 거주지, 풍력발전기, 제련소, 창고는 ROI가 낮습니다. HQ와 연구소에 집중하세요. 이 건물들은 요구사항이 아니면 업그레이드하지 마세요.'
        : 'Nông trại, Khu dân cư, Turbine gió, Xưởng luyện kim, Kho có ROI thấp. Tập trung vào HQ và Phòng nghiên cứu.',
      priority: 'high',
    },
    {
      number: 5,
      title: isKorean ? '연맹 인정(Alliance Recognition) 연구 먼저' : 'Nghiên cứu Alliance Recognition trước',
      desc: isKorean
        ? '전투 연구보다 연맹 인정 연구를 먼저 완료하세요. 일일 보상(배지, 합금, 조각)이 2배가 됩니다.'
        : 'Hoàn thành nghiên cứu Alliance Recognition trước nghiên cứu chiến đấu. Phần thưởng hàng ngày (huy hiệu, hợp kim, mảnh) tăng gấp đôi.',
      priority: 'high',
    },
    {
      number: 6,
      title: isKorean ? '활동적인 연맹에 가입하세요' : 'Tham gia liên minh hoạt động',
      desc: isKorean
        ? '비활성 연맹에 있으면 성장이 느립니다. 친분 때문에 머무르지 말고 활동적인 연맹을 찾아 이동하세요.'
        : 'Ở trong liên minh không hoạt động sẽ chậm phát triển. Đừng ở lại vì tình bạn, hãy tìm liên minh năng động.',
      priority: 'high',
    },
    {
      number: 7,
      title: isKorean ? '매일 트럭을 보내세요' : 'Gửi xe tải mỗi ngày',
      desc: isKorean
        ? '트럭에서 부품 상자, 오렌지 장비 조각을 얻을 수 있습니다. 매일 빠짐없이 보내세요.'
        : 'Xe tải có thể cho hộp linh kiện, mảnh trang bị cam. Gửi mỗi ngày không bỏ lỡ.',
      priority: 'medium',
    },
    {
      number: 8,
      title: isKorean ? '소피아(Sophia)를 5성까지 키우세요' : 'Nâng Sophia lên 5 sao',
      desc: isKorean
        ? '소피아 5성은 건설 비용 10% 감소 + 건설 속도 증가 효과가 있습니다. 수십억 자원을 절약할 수 있어 필수 육성 영웅입니다.'
        : 'Sophia 5 sao giảm 10% chi phí xây dựng + tăng tốc độ xây dựng. Tiết kiệm hàng tỷ tài nguyên, bắt buộc phải nuôi.',
      priority: 'medium',
    },
    {
      number: 9,
      title: isKorean ? '퓨리로드(Furylord) 공격을 놓치지 마세요' : 'Đừng bỏ lỡ tấn công Furylord',
      desc: isKorean
        ? '매일 4회(00:00, 06:00, 12:00, 18:00) 출현. 일요일 제외. 연료 없이도 공격하세요. 300만 데미지로 보라장비 전체 해금.'
        : 'Xuất hiện 4 lần/ngày (00:00, 06:00, 12:00, 18:00), trừ Chủ nhật. Tấn công dù không có nhiên liệu. 3M damage mở khóa toàn bộ trang bị tím.',
      priority: 'medium',
    },
    {
      number: 10,
      title: isKorean ? '꾸준함이 강도를 이깁니다' : 'Kiên trì thắng cường độ',
      desc: isKorean
        ? '매일 30분 플레이가 일주일에 한번 5시간 플레이보다 훨씬 효과적입니다. 꾸준한 일일 루틴이 핵심입니다.'
        : 'Chơi 30 phút mỗi ngày hiệu quả hơn 5 giờ mỗi tuần. Thói quen hàng ngày đều đặn là chìa khóa.',
      priority: 'medium',
    },
  ];

  const priorityConfig = {
    high: {
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/30',
      label: isKorean ? '필수' : 'Quan trọng',
    },
    medium: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/30',
      label: isKorean ? '권장' : 'Khuyến nghị',
    },
    low: {
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      label: isKorean ? '참고' : 'Tham khảo',
    },
  };

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-beginner">
              {t('difficulty.beginner')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold">
            {isKorean ? '초보자 필수 팁 10가지' : '10 mẹo quan trọng cho người mới'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '처음 시작하는 분들이 꼭 알아야 할 필수 팁을 정리했습니다.'
              : 'Tổng hợp các mẹo quan trọng mà người mới bắt đầu cần biết.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '메인 5명 영웅에만 집중, 자원 분산 금지' : 'Chỉ tập trung 5 anh hùng chính, không phân tán tài nguyên'}</li>
              <li>• {isKorean ? '가속 아이템은 연맹 대결 테마에 맞춰 사용 (7일 연속, 6개 테마 순환)' : 'Dùng tăng tốc theo theme Alliance Duel (7 ngày liên tục, 6 theme xoay vòng)'}</li>
              <li>• {isKorean ? '자원 생산 건물 스킵, HQ와 연구소에 집중' : 'Bỏ qua công trình sản xuất, tập trung HQ và Lab'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Priority Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          {Object.entries(priorityConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.color} bg-current`} />
              <span className="text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>

        {/* Tips List */}
        <div className="space-y-4">
          {tips.map((tip) => {
            const config = priorityConfig[tip.priority as keyof typeof priorityConfig];
            return (
              <Card key={tip.number} className={`border ${config.bg}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background font-bold text-lg ${config.color}`}>
                      {tip.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{tip.title}</h3>
                        <Badge variant="outline" className={`text-xs ${config.color}`}>
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{tip.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary Checklist */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '일일 체크리스트' : 'Danh sách kiểm tra hàng ngày'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {[
                  isKorean ? '트럭 보내기 (부품상자, 오렌지 조각 획득)' : 'Gửi xe tải (hộp linh kiện, mảnh cam)',
                  isKorean ? '퓨리로드 4회 공격 (일요일 제외)' : 'Tấn công Furylord 4 lần (trừ CN)',
                  isKorean ? '메리트 상자 3개 열기 (최소 3개 임무 완료)' : 'Mở 3 hộp Merit (hoàn thành ít nhất 3 nhiệm vụ)',
                  isKorean ? '연맹 도움 요청 및 도움주기' : 'Yêu cầu và hỗ trợ liên minh',
                  isKorean ? '오늘의 이벤트 요일 확인 후 해당 활동 집중' : 'Kiểm tra ngày sự kiện và tập trung hoạt động phù hợp',
                  isKorean ? '오렌지 바운티/트레이드 우선 완료' : 'Ưu tiên hoàn thành Bounty/Trade cam',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-tip shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Core Philosophy */}
        <div className="info-tip flex gap-3">
          <Lightbulb className="h-5 w-5 text-tip shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-tip mb-1">
              {isKorean ? '핵심 원칙' : 'Nguyên tắc cốt lõi'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '"이벤트 기간 외에는 절대 자원을 사용하지 마세요" - 해당 이벤트 요일에 맞춰 자원을 사용하면 2~3배의 가치를 얻습니다.'
                : '"Không bao giờ sử dụng tài nguyên ngoài thời gian sự kiện" - Sử dụng tài nguyên đúng ngày sự kiện để nhận giá trị gấp 2-3 lần.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
