import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Clock,
  CheckCircle2,
  Calendar,
  Zap,
  AlertTriangle,
  Info,
} from 'lucide-react';

export default async function DailyRoutinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DailyRoutineContent locale={locale} />;
}

function DailyRoutineContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // 연맹 대결 6개 테마 (7일 연속 이벤트)
  const allianceDuelCycle = [
    {
      theme: 1,
      name: isKorean ? '건물 업그레이드' : 'Shelter Upgrade',
      nameEn: 'Shelter Upgrade',
      tasks: isKorean
        ? ['건물 개선 완료', '건설 가속 사용', '오렌지 바운티 새로고침', '고가치 퀘스트 우선']
        : ['Hoàn thành cải thiện công trình', 'Dùng tăng tốc xây', 'Refresh bounty cam', 'Ưu tiên quest giá trị cao'],
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
    {
      theme: 2,
      name: isKorean ? '과학의 시대' : 'Age of Science',
      nameEn: 'Age of Science',
      tasks: isKorean
        ? ['연구 완료', '연구 가속 사용', '배지 관련 연구', '인터스테이트 트럭 오렌지 퀘스트 찾기']
        : ['Hoàn thành NC', 'Dùng tăng tốc NC', 'NC liên quan badge', 'Refresh Interstate Truck tìm quest cam'],
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
    },
    {
      theme: 3,
      name: isKorean ? '영웅 이니셔티브' : 'Hero Initiative',
      nameEn: 'Hero Initiative',
      tasks: isKorean
        ? ['영웅 업그레이드', '영웅 조각 사용', '모집 티켓 사용', '이 날을 위해 조각/티켓 저장!']
        : ['Nâng anh hùng', 'Dùng mảnh anh hùng', 'Dùng vé tuyển mộ', 'Lưu mảnh/vé cho ngày này!'],
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
    },
    {
      theme: 4,
      name: isKorean ? '종합 성장' : 'Holistic Growth',
      nameEn: 'Holistic Growth',
      tasks: isKorean
        ? ['병력 훈련', '훈련 가속 사용', '일반 병사 훈련 = 자원 대비 최적 포인트']
        : ['Huấn luyện quân', 'Dùng tăng tốc HL', 'Lính thường = điểm tối ưu/tài nguyên'],
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      theme: 5,
      name: isKorean ? '차량 개조' : 'Modded Vehicle Boost',
      nameEn: 'Modded Vehicle Boost',
      tasks: isKorean
        ? ['렌치, 설계도, 부품으로 차량 업그레이드', '강력한 부머 처치로 추가 포인트']
        : ['Nâng xe bằng cờ lê, bản vẽ, linh kiện', 'Tiêu diệt Boomer mạnh để có thêm điểm'],
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
    },
    {
      theme: 6,
      name: isKorean ? '적 파괴자' : 'Enemy Buster',
      nameEn: 'Enemy Buster',
      tasks: isKorean
        ? ['적 기지 공격', '약한 본부(HQ) 타겟', '발로 메달 + 오렌지 장비 조각 획득', '병력 손실 최소화 타겟 선정']
        : ['Tấn công căn cứ địch', 'Nhắm HQ yếu', 'Valor Medal + mảnh trang bị cam', 'Chọn target giảm thiểu mất quân'],
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
    },
  ];

  // 매일 해야 할 필수 작업
  const dailyTasks = [
    {
      task: isKorean ? '트럭 보내기 (부품상자, 오렌지 조각 획득)' : 'Gửi xe tải (hộp linh kiện, mảnh cam)',
      priority: 'high',
    },
    {
      task: isKorean ? '난폭 두목 4회 공격 (00/06/12/18시, 일요일 제외)' : 'Tấn công Furylord 4 lần (00/06/12/18h, trừ CN)',
      priority: 'high',
    },
    {
      task: isKorean ? '공훈상자 3개 열기 (최소 3개 임무 완료)' : 'Mở 3 hộp Merit (hoàn thành ít nhất 3 nhiệm vụ)',
      priority: 'high',
    },
    {
      task: isKorean ? '연맹 도움 요청 및 도움주기' : 'Yêu cầu và hỗ trợ liên minh',
      priority: 'high',
    },
    {
      task: isKorean ? '히어로 이니셔티브 / 모드 차량 부스트 (거의 무료)' : 'Hero Initiative / Mod Vehicle Boost (gần như miễn phí)',
      priority: 'medium',
    },
    {
      task: isKorean ? '오늘의 이벤트 요일 확인 후 해당 활동 집중' : 'Kiểm tra ngày sự kiện và tập trung hoạt động phù hợp',
      priority: 'medium',
    },
  ];

  // 연맹 대결 테마별 가속 사용 (7일 연속, 6개 테마 순환)
  const allianceDuelThemes = [
    { theme: isKorean ? '건물 업그레이드' : 'Shelter Upgrade', speedup: isKorean ? '건설 가속' : 'Tăng tốc xây dựng' },
    { theme: isKorean ? '과학의 시대' : 'Age of Science', speedup: isKorean ? '연구 가속' : 'Tăng tốc nghiên cứu' },
    { theme: isKorean ? '종합 성장' : 'Holistic Growth', speedup: isKorean ? '훈련 가속' : 'Tăng tốc huấn luyện' },
  ];

  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-blue-400',
  };

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
              5 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold">
            {isKorean ? '일일 루틴 가이드' : 'Hướng dẫn thói quen hàng ngày'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '효율적인 성장을 위한 일일 체크리스트와 연맹 대결 테마별 전략입니다.'
              : 'Danh sách kiểm tra hàng ngày và chiến thuật theo theme Alliance Duel để phát triển hiệu quả.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                •{' '}
                {isKorean
                  ? '매일 30분 꾸준한 플레이가 일주일에 5시간 몰아치기보다 효과적'
                  : 'Chơi đều đặn 30 phút mỗi ngày hiệu quả hơn 5 giờ mỗi tuần'}
              </li>
              <li>
                •{' '}
                {isKorean
                  ? '이벤트 요일 외에는 절대 자원/아이템 사용 금지 (2~3배 가치)'
                  : 'Không bao giờ dùng tài nguyên/vật phẩm ngoài ngày sự kiện (giá trị gấp 2-3)'}
              </li>
              <li>
                •{' '}
                {isKorean
                  ? '연맹 대결 테마에 맞춰 가속 사용 (7일 연속, 6개 테마 순환)'
                  : 'Dùng tăng tốc theo theme Alliance Duel (7 ngày liên tục, 6 theme xoay vòng)'}
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Core Principle */}
        <div className="info-warning flex gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning">
              {isKorean ? '핵심 원칙' : 'Nguyên tắc cốt lõi'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '"이벤트 기간 외에는 절대 자원을 사용하지 마세요" - 해당 이벤트 요일에 맞춰 자원을 사용하면 2~3배의 가치를 얻습니다.'
                : '"Không bao giờ sử dụng tài nguyên ngoài thời gian sự kiện" - Sử dụng đúng ngày sẽ nhận giá trị gấp 2-3 lần.'}
            </p>
          </div>
        </div>

        {/* Daily Must-Do */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '매일 필수 작업' : 'Việc bắt buộc mỗi ngày'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {dailyTasks.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        className={`h-5 w-5 shrink-0 ${
                          priorityColors[item.priority as keyof typeof priorityColors]
                        }`}
                      />
                      <span className="text-sm">{item.task}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Alliance Duel Speedups */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-highlight" />
              {isKorean ? '연맹 대결 테마별 가속 사용 (7일 연속)' : 'Dùng tăng tốc theo theme Alliance Duel (7 ngày liên tục)'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {allianceDuelThemes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border"
                >
                  <Badge variant="outline" className="text-highlight border-highlight/30 text-xs">
                    {item.theme}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{item.speedup}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              {isKorean
                ? '💡 해당 테마 날에 가속 아이템을 사용하면 연맹 대결 포인트 극대화! (Full Prep와 겹치면 보상 2배)'
                : '💡 Dùng tăng tốc đúng ngày theme để tối đa điểm AD! (Thưởng gấp đôi khi trùng Full Prep)'}
            </p>
          </CardContent>
        </Card>

        {/* Alliance Duel 6 Themes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-highlight" />
            {isKorean ? '연맹 대결 6개 테마 (7일 연속)' : 'Alliance Duel 6 Theme (7 ngày liên tục)'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isKorean
              ? '연맹 대결은 7일 연속으로 진행되며, 매일 6개 테마 중 하나가 적용됩니다. 해당 테마에 맞는 활동으로만 포인트를 획득할 수 있습니다.'
              : 'Alliance Duel kéo dài 7 ngày liên tục, mỗi ngày áp dụng 1 trong 6 theme. Chỉ hoạt động đúng theme mới được điểm.'}
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allianceDuelCycle.map((event) => (
              <Card key={event.theme} className={`border ${event.border}`}>
                <CardHeader className={`pb-2 ${event.bg} rounded-t-lg`}>
                  <CardTitle className={`text-lg flex items-center gap-2 ${event.color}`}>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-sm font-bold">
                      {event.theme}
                    </span>
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <ul className="space-y-2">
                    {event.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full ${event.color} bg-current mt-1.5 shrink-0`} />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Furylord Info */}
        <Card className="border-red-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-red-400">
              {isKorean ? '난폭 두목 (Furylord) 공략' : 'Công lược Furylord'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {isKorean
                    ? '출현 시간: 00:00, 06:00, 12:00, 18:00 (일요일 제외)'
                    : 'Thời gian xuất hiện: 00:00, 06:00, 12:00, 18:00 (trừ Chủ nhật)'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {isKorean
                    ? '연료 없이도 공격 가능 - 절대 스킵하지 마세요'
                    : 'Có thể tấn công không cần nhiên liệu - đừng bao giờ bỏ qua'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {isKorean
                    ? '300만 데미지 달성 시 보라 장비 전체 해금'
                    : 'Đạt 3M damage để mở khóa toàn bộ trang bị tím'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {isKorean
                    ? '진영 50% 데미지 보너스 요일에 맞춰 공격하면 보상 극대화'
                    : 'Tấn công vào ngày bonus 50% damage của phe để tối đa hóa phần thưởng'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Merit Chests */}
        <div className="info-tip flex gap-3">
          <Zap className="h-5 w-5 text-tip shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-tip mb-1">
              {isKorean ? '공훈상자 팁' : 'Mẹo hộp Merit'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '매일 3개 임무만 완료하면 모든 공훈상자를 열 수 있습니다. 히어로 이니셔티브와 모드 차량 부스트는 거의 무료로 기여 가능합니다.'
                : 'Chỉ cần hoàn thành 3 nhiệm vụ mỗi ngày để mở tất cả hộp Merit. Hero Initiative và Mod Vehicle Boost có thể đóng góp gần như miễn phí.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
