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
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  // 연맹 대결 6개 테마 (7일 연속 이벤트)
  const allianceDuelCycle = [
    {
      theme: 1,
      name: l('차량개조의 날', 'Modded Vehicle Day', 'Modded Vehicle Day'),
      nameEn: 'Modded Vehicle Day',
      tasks: [
        l('렌치, 개조도면, 부품으로 차량 업그레이드', 'Nâng xe bằng cờ lê, bản vẽ, linh kiện', 'Upgrade vehicles with wrenches, blueprints, and parts'),
        l('강력한 부머 처치로 추가 포인트', 'Tiêu diệt Boomer mạnh để có thêm điểm', 'Kill powerful Boomers for extra points'),
      ],
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
    },
    {
      theme: 2,
      name: l('건설의 날', 'Construction Day', 'Construction Day'),
      nameEn: 'Construction Day',
      tasks: [
        l('건물 개선 완료', 'Hoàn thành cải thiện công trình', 'Complete building upgrades'),
        l('건설 가속 사용', 'Dùng tăng tốc xây', 'Use construction speedups'),
        l('주황 바운티 새로고침', 'Refresh bounty cam', 'Refresh orange bounties'),
        l('고가치 퀘스트 우선', 'Ưu tiên quest giá trị cao', 'Prioritize high-value quests'),
      ],
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
    {
      theme: 3,
      name: l('테크연구의 날', 'Tech Research Day', 'Tech Research Day'),
      nameEn: 'Tech Research Day',
      tasks: [
        l('연구 완료', 'Hoàn thành NC', 'Complete research'),
        l('연구 가속 사용', 'Dùng tăng tốc NC', 'Use research speedups'),
        l('경찰휘장 관련 연구', 'NC liên quan badge', 'Badge-related research'),
        l('도시교역 트럭 주황 퀘스트 찾기', 'Refresh Interstate Truck tìm quest cam', 'Find orange quests via Interstate Truck refresh'),
      ],
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
    },
    {
      theme: 4,
      name: l('영웅육성의 날', 'Hero Initiative Day', 'Hero Initiative Day'),
      nameEn: 'Hero Initiative Day',
      tasks: [
        l('영웅 업그레이드', 'Nâng anh hùng', 'Upgrade heroes'),
        l('영웅 조각 사용', 'Dùng mảnh anh hùng', 'Use hero fragments'),
        l('모집권 사용', 'Dùng vé tuyển mộ', 'Use recruitment tickets'),
        l('이 날을 위해 조각/모집권 저장!', 'Lưu mảnh/vé cho ngày này!', 'Save fragments/tickets for this day!'),
      ],
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
    },
    {
      theme: 5,
      name: l('전면적 발전의 날', 'Holistic Growth Day', 'Holistic Growth Day'),
      nameEn: 'Holistic Growth Day',
      tasks: [
        l('병력 훈련', 'Huấn luyện quân', 'Train troops'),
        l('훈련 가속 사용', 'Dùng tăng tốc HL', 'Use training speedups'),
        l('일반 병사 훈련 = 자원 대비 최적 포인트', 'Lính thường = điểm tối ưu/tài nguyên', 'Training normal troops = best points per resource'),
      ],
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
    },
    {
      theme: 6,
      name: l('킬데이', 'Kill Day', 'Kill Day'),
      nameEn: 'Kill Day',
      tasks: [
        l('적 기지 공격', 'Tấn công căn cứ địch', 'Attack enemy bases'),
        l('약한 본부(HQ) 타겟', 'Nhắm HQ yếu', 'Target weak HQs'),
        l('용사훈장 + 주황 장비 조각 획득', 'Valor Medal + mảnh trang bị cam', 'Earn Valor Medals + orange gear fragments'),
        l('병력 손실 최소화 타겟 선정', 'Chọn target giảm thiểu mất quân', 'Pick targets that minimize troop losses'),
      ],
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
    },
  ];

  // 매일 해야 할 필수 작업
  const dailyTasks = [
    {
      task: l('트럭 보내기 (부품상자, 주황 조각 획득)', 'Gửi xe tải (hộp linh kiện, mảnh cam)', 'Send trucks (parts boxes, orange fragments)'),
      priority: 'high',
    },
    {
      task: l('난폭 두목 4회 공격 (00/06/12/18시, 일요일 제외)', 'Tấn công Furylord 4 lần (00/06/12/18h, trừ CN)', 'Attack Furylord 4 times (00/06/12/18h, except Sunday)'),
      priority: 'high',
    },
    {
      task: l('공훈상자 3개 열기 (최소 3개 임무 완료)', 'Mở 3 hộp Merit (hoàn thành ít nhất 3 nhiệm vụ)', 'Open 3 Merit Chests (complete at least 3 missions)'),
      priority: 'high',
    },
    {
      task: l('연맹 도움 요청 및 도움주기', 'Yêu cầu và hỗ trợ liên minh', 'Request and give Alliance help'),
      priority: 'high',
    },
    {
      task: l('영웅육성 / 모드 차량 부스트 (거의 무료)', 'Hero Initiative / Mod Vehicle Boost (gần như miễn phí)', 'Hero Initiative / Mod Vehicle Boost (nearly free)'),
      priority: 'medium',
    },
    {
      task: l('오늘의 이벤트 요일 확인 후 해당 활동 집중', 'Kiểm tra ngày sự kiện và tập trung hoạt động phù hợp', 'Check today\'s event theme and focus on matching activities'),
      priority: 'medium',
    },
    {
      task: l('아레나 5회 도전 (주간 다이아 보상)', 'Thach dau Arena 5 lan (phan thuong kim cuong tuan)', 'Arena 5 attempts (weekly diamond rewards)'),
      priority: 'medium',
    },
    {
      task: l('피난민 디스패치 확인', 'Kiem tra phai cu Nguoi ti nan', 'Check Refugee dispatches'),
      priority: 'medium',
    },
  ];

  // 연맹 대결 테마별 가속 사용 (7일 연속, 6개 테마 순환)
  const allianceDuelThemes = [
    { theme: l('건물 업그레이드', 'Shelter Upgrade', 'Shelter Upgrade'), speedup: l('건설 가속', 'Tăng tốc xây dựng', 'Construction Speedup') },
    { theme: l('과학의 시대', 'Age of Science', 'Age of Science'), speedup: l('연구 가속', 'Tăng tốc nghiên cứu', 'Research Speedup') },
    { theme: l('종합 성장', 'Holistic Growth', 'Holistic Growth'), speedup: l('훈련 가속', 'Tăng tốc huấn luyện', 'Training Speedup') },
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
            {l('일일 루틴 가이드', 'Hướng dẫn thói quen hàng ngày', 'Daily Routine Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '효율적인 성장을 위한 일일 체크리스트와 연맹 대결 테마별 전략입니다.',
              'Danh sách kiểm tra hàng ngày và chiến thuật theo theme Alliance Duel để phát triển hiệu quả.',
              'Daily checklist and Alliance Duel theme strategies for efficient progression.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                •{' '}
                {l(
                  '매일 30분 꾸준한 플레이가 일주일에 5시간 몰아치기보다 효과적',
                  'Chơi đều đặn 30 phút mỗi ngày hiệu quả hơn 5 giờ mỗi tuần',
                  '30 minutes daily is more effective than 5 hours in one weekly session'
                )}
              </li>
              <li>
                •{' '}
                {l(
                  '이벤트 요일 외에는 절대 자원/아이템 사용 금지 (2~3배 가치)',
                  'Không bao giờ dùng tài nguyên/vật phẩm ngoài ngày sự kiện (giá trị gấp 2-3)',
                  'Never spend resources/items outside event days (2-3x value)'
                )}
              </li>
              <li>
                •{' '}
                {l(
                  '연맹 대결 테마에 맞춰 가속 사용 (7일 연속, 6개 테마 순환)',
                  'Dùng tăng tốc theo theme Alliance Duel (7 ngày liên tục, 6 theme xoay vòng)',
                  'Use speedups matching Alliance Duel themes (7-day cycle, 6 rotating themes)'
                )}
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Core Principle */}
        <div className="info-warning flex gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning">
              {l('핵심 원칙', 'Nguyên tắc cốt lõi', 'Core Principle')}
            </p>
            <p className="text-sm text-muted-foreground">
              {l(
                '"이벤트 기간 외에는 절대 자원을 사용하지 마세요" - 해당 이벤트 요일에 맞춰 자원을 사용하면 2~3배의 가치를 얻습니다.',
                '"Không bao giờ sử dụng tài nguyên ngoài thời gian sự kiện" - Sử dụng đúng ngày sẽ nhận giá trị gấp 2-3 lần.',
                '"Never spend resources outside event windows" — using them on the matching event day yields 2-3x the value.'
              )}
            </p>
          </div>
        </div>

        {/* Daily Must-Do */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('매일 필수 작업', 'Việc bắt buộc mỗi ngày', 'Daily Must-Do Tasks')}
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
              {l('연맹 대결 테마별 가속 사용 (7일 연속)', 'Dùng tăng tốc theo theme Alliance Duel (7 ngày liên tục)', 'Alliance Duel Theme Speedups (7-Day Cycle)')}
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
              {l(
                '해당 테마 날에 가속 아이템을 사용하면 연맹 대결 포인트 극대화! (Full Prep와 겹치면 보상 2배)',
                'Dùng tăng tốc đúng ngày theme để tối đa điểm AD! (Thưởng gấp đôi khi trùng Full Prep)',
                'Use speedups on matching theme days to maximize Alliance Duel points! (Double rewards when overlapping with Full Prep)'
              )}
            </p>
          </CardContent>
        </Card>

        {/* Alliance Duel 6 Themes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-highlight" />
            {l('연맹 대결 6개 테마 (7일 연속)', 'Alliance Duel 6 Theme (7 ngày liên tục)', 'Alliance Duel 6 Themes (7-Day Cycle)')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {l(
              '연맹 대결은 7일 연속으로 진행되며, 매일 6개 테마 중 하나가 적용됩니다. 해당 테마에 맞는 활동으로만 포인트를 획득할 수 있습니다.',
              'Alliance Duel kéo dài 7 ngày liên tục, mỗi ngày áp dụng 1 trong 6 theme. Chỉ hoạt động đúng theme mới được điểm.',
              'Alliance Duel runs for 7 consecutive days, with one of 6 themes each day. You can only earn points from activities matching the daily theme.'
            )}
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allianceDuelCycle.map((event) => (
              <Card key={event.theme} className={`border ${event.border} !py-0 !gap-0 overflow-hidden`}>
                <div className={`px-4 py-3 ${event.bg}`}>
                  <div className={`text-lg font-semibold flex items-center gap-2 ${event.color}`} data-slot="card-title">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background text-sm font-bold">
                      {event.theme}
                    </span>
                    {event.name}
                  </div>
                </div>
                <CardContent className="pt-4 pb-4">
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
              {l('난폭 두목 (Furylord) 공략', 'Công lược Furylord', 'Furylord Guide')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {l(
                    '출현 시간: 00:00, 06:00, 12:00, 18:00 (일요일 제외)',
                    'Thời gian xuất hiện: 00:00, 06:00, 12:00, 18:00 (trừ Chủ nhật)',
                    'Spawn times: 00:00, 06:00, 12:00, 18:00 (except Sunday)'
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {l(
                    '연료 없이도 공격 가능 - 절대 스킵하지 마세요',
                    'Có thể tấn công không cần nhiên liệu - đừng bao giờ bỏ qua',
                    'Costs no fuel to attack — never skip this'
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {l(
                    '300만 데미지 달성 시 보라 장비 전체 해금',
                    'Đạt 3M damage để mở khóa toàn bộ trang bị tím',
                    'Reaching 3M damage unlocks all purple gear'
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {l(
                    '진영 50% 데미지 보너스 요일에 맞춰 공격하면 보상 극대화',
                    'Tấn công vào ngày bonus 50% damage của phe để tối đa hóa phần thưởng',
                    'Attack on your faction\'s 50% damage bonus day to maximize rewards'
                  )}
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
              {l('공훈상자 팁', 'Mẹo hộp Merit', 'Merit Chest Tip')}
            </p>
            <p className="text-sm text-muted-foreground">
              {l(
                '매일 3개 임무만 완료하면 모든 공훈상자를 열 수 있습니다. 영웅육성와 모드 차량 부스트는 거의 무료로 기여 가능합니다.',
                'Chỉ cần hoàn thành 3 nhiệm vụ mỗi ngày để mở tất cả hộp Merit. Hero Initiative và Mod Vehicle Boost có thể đóng góp gần như miễn phí.',
                'Complete just 3 missions daily to open all Merit Chests. Hero Initiative and Mod Vehicle Boost can contribute nearly for free.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
