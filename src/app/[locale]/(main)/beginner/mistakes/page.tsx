import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, XCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export default async function MistakesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MistakesContent locale={locale} />;
}

function MistakesContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // 실제 lastzguides.com 기반 실수 목록
  const mistakes = [
    {
      number: 1,
      title: isKorean ? '영웅 자원을 모든 영웅에 분산' : 'Phân tán tài nguyên cho tất cả anh hùng',
      wrong: isKorean
        ? '모든 영웅을 조금씩 키움'
        : 'Nuôi tất cả anh hùng một chút',
      right: isKorean
        ? '메인 진형 5명에만 집중 투자. 서포트 영웅은 4성까지만'
        : 'Chỉ tập trung đầu tư vào 5 anh hùng chính. Anh hùng hỗ trợ tối đa 4 sao',
      severity: 'high',
    },
    {
      number: 2,
      title: isKorean ? '자원 생산 건물 업그레이드' : 'Nâng cấp công trình sản xuất tài nguyên',
      wrong: isKorean
        ? '농장, 거주지, 풍력발전기, 제련소, 창고를 업그레이드'
        : 'Nâng cấp Nông trại, Khu dân cư, Turbine gió, Xưởng luyện kim, Kho',
      right: isKorean
        ? '이 건물들은 ROI가 매우 낮음. HQ와 연구소에만 집중. 요구사항 아니면 스킵'
        : 'Những công trình này có ROI rất thấp. Chỉ tập trung HQ và Lab. Bỏ qua nếu không phải yêu cầu',
      severity: 'high',
    },
    {
      number: 3,
      title: isKorean ? '가속 아이템 무분별 사용' : 'Sử dụng tăng tốc bừa bãi',
      wrong: isKorean
        ? '가속 아이템을 아무 때나 사용'
        : 'Dùng tăng tốc bất cứ lúc nào',
      right: isKorean
        ? '연맹 대결 테마에 맞춰 사용 (7일 연속, 6개 테마 순환). 건물 업그레이드 날: 건설가속, 과학의 시대 날: 연구가속, 종합 성장 날: 훈련가속'
        : 'Dùng theo theme Alliance Duel (7 ngày, 6 theme xoay vòng). Ngày Shelter Upgrade: tăng tốc xây, Age of Science: NC, Holistic Growth: HL',
      severity: 'high',
    },
    {
      number: 4,
      title: isKorean ? '연맹 인정(AR) 연구 미루기' : 'Trì hoãn nghiên cứu Alliance Recognition',
      wrong: isKorean
        ? '전투 연구부터 시작하고 연맹 인정은 나중에'
        : 'Bắt đầu nghiên cứu chiến đấu trước, Alliance Recognition sau',
      right: isKorean
        ? '연맹 인정 연구를 먼저 완료. 일일 보상(배지, 합금, 조각)이 2배됨'
        : 'Hoàn thành AR trước. Phần thưởng hàng ngày (huy hiệu, hợp kim, mảnh) tăng gấp đôi',
      severity: 'high',
    },
    {
      number: 5,
      title: isKorean ? '비활성 연맹에 머무름' : 'Ở lại liên minh không hoạt động',
      wrong: isKorean
        ? '친분 때문에 비활성 연맹에 계속 있음'
        : 'Ở lại liên minh không hoạt động vì tình bạn',
      right: isKorean
        ? '활동적인 연맹으로 이동. 연맹 도움, 상점, 이벤트가 성장의 핵심'
        : 'Chuyển sang liên minh hoạt động. Hỗ trợ, shop, sự kiện liên minh là chìa khóa phát triển',
      severity: 'high',
    },
    {
      number: 6,
      title: isKorean ? '진영 혼합 (Mixed Factions)' : 'Trộn phe phái',
      wrong: isKorean
        ? '3개 진영 영웅을 섞어서 사용'
        : 'Dùng anh hùng từ 3 phe lẫn lộn',
      right: isKorean
        ? '메인 진영 하나 선택 + 서브 진영 2명 조합 (예: 윙즈3 + 블러드2)'
        : 'Chọn một phe chính + 2 phụ (VD: 3 Wings + 2 Blood)',
      severity: 'high',
    },
    {
      number: 7,
      title: isKorean ? '영웅 훈련 연구 깊이 파기' : 'Đào sâu nghiên cứu Hero Training',
      wrong: isKorean
        ? '영웅 훈련(Hero Training) 연구를 끝까지 완료'
        : 'Hoàn thành toàn bộ nghiên cứu Hero Training',
      right: isKorean
        ? 'Cockpit까지만 하고 멈춤. 이후는 배지 대비 효율이 극히 낮음 (배지 함정)'
        : 'Dừng ở Cockpit. Sau đó hiệu quả badge cực thấp (bẫy badge)',
      severity: 'medium',
    },
    {
      number: 8,
      title: isKorean ? '이벤트 테마 무시하고 자원 사용' : 'Dùng tài nguyên không theo theme sự kiện',
      wrong: isKorean
        ? '아무 때나 자원과 아이템 사용'
        : 'Dùng tài nguyên và vật phẩm bất cứ lúc nào',
      right: isKorean
        ? '연맹 대결(7일, 6테마 순환) + Full Preparedness(4시간마다 5테마 변경) 겹칠 때 활동하면 보상 극대화. 해당 테마에 맞는 가속/아이템 사용'
        : 'Hoạt động khi Alliance Duel (7 ngày, 6 theme) + Full Prep (5 theme đổi mỗi 4 tiếng) trùng nhau để tối đa thưởng. Dùng tăng tốc/item theo theme phù hợp',
      severity: 'medium',
    },
    {
      number: 9,
      title: isKorean ? '퓨리로드 공격 안 함' : 'Không tấn công Furylord',
      wrong: isKorean
        ? '연료가 없어서 퓨리로드 공격을 스킵'
        : 'Bỏ qua tấn công Furylord vì không có nhiên liệu',
      right: isKorean
        ? '연료 없이도 공격. 일요일 제외 매일 4회(00/06/12/18시). 300만 데미지로 보라장비 해금'
        : 'Tấn công dù không có nhiên liệu. 4 lần/ngày (00/06/12/18h) trừ CN. 3M damage mở trang bị tím',
      severity: 'medium',
    },
    {
      number: 10,
      title: isKorean ? '소피아(Sophia) 육성 안 함' : 'Không nuôi Sophia',
      wrong: isKorean
        ? '소피아는 에픽이라서 무시하고 레전더리만 키움'
        : 'Bỏ qua Sophia vì là Epic, chỉ nuôi Legendary',
      right: isKorean
        ? '소피아 5성 필수. 건설 비용 10% 감소 + 속도 증가. 수십억 자원 절약'
        : 'Sophia 5 sao bắt buộc. Giảm 10% chi phí xây dựng + tăng tốc. Tiết kiệm hàng tỷ tài nguyên',
      severity: 'medium',
    },
  ];

  const severityConfig = {
    high: {
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      label: isKorean ? '치명적' : 'Nghiêm trọng',
    },
    medium: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      label: isKorean ? '주의' : 'Cẩn thận',
    },
    low: {
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
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
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold">
            {isKorean ? '초반 실수 TOP 10' : 'TOP 10 sai lầm ban đầu'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '초보자들이 자주 하는 실수와 올바른 방법을 알아봅니다.'
              : 'Tìm hiểu những sai lầm thường gặp của người mới và cách làm đúng.'}
          </p>
        </div>

        {/* Warning Box */}
        <div className="info-important flex gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-400">
              {isKorean ? '중요' : 'Quan trọng'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '이 실수들은 초반 성장을 크게 방해합니다. 특히 "치명적" 표시된 항목은 반드시 피하세요.'
                : 'Những sai lầm này cản trở đáng kể sự phát triển ban đầu. Đặc biệt tránh các mục đánh dấu "Nghiêm trọng".'}
            </p>
          </div>
        </div>

        {/* Severity Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          {Object.entries(severityConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${config.color} bg-current`} />
              <span className="text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>

        {/* Mistakes List */}
        <div className="space-y-4">
          {mistakes.map((mistake) => {
            const config = severityConfig[mistake.severity as keyof typeof severityConfig];
            return (
              <Card key={mistake.number} className={`border ${config.border}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg} font-bold text-lg ${config.color}`}>
                      {mistake.number}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{mistake.title}</h3>
                        <Badge variant="outline" className={`text-xs ${config.color}`}>
                          {config.label}
                        </Badge>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                          <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-red-400 mb-1">
                              {isKorean ? '잘못된 방법' : 'Cách sai'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {mistake.wrong}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                          <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-green-400 mb-1">
                              {isKorean ? '올바른 방법' : 'Cách đúng'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {mistake.right}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Summary */}
        <Card className="border-tip/30 bg-tip/5">
          <CardContent className="p-4">
            <h2 className="font-semibold text-tip mb-3">
              {isKorean ? '핵심 요약' : 'Tóm tắt quan trọng'}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {isKorean ? '메인 5명 영웅에만 집중 투자' : 'Chỉ tập trung đầu tư vào 5 anh hùng chính'}</li>
              <li>• {isKorean ? '자원 생산 건물 스킵, HQ와 연구소에 집중' : 'Bỏ qua công trình sản xuất, tập trung HQ và Lab'}</li>
              <li>• {isKorean ? '가속 아이템은 연맹 대결 테마에 맞춰 사용 (7일 연속, 6테마 순환)' : 'Dùng tăng tốc theo theme Alliance Duel (7 ngày, 6 theme xoay vòng)'}</li>
              <li>• {isKorean ? 'Full Prep와 연맹 대결 겹칠 때 활동하면 보상 극대화' : 'Hoạt động khi Full Prep + AD trùng để tối đa thưởng'}</li>
              <li>• {isKorean ? '소피아 5성 필수 육성 (건설 비용 절약)' : 'Nuôi Sophia 5 sao bắt buộc (tiết kiệm chi phí xây dựng)'}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
