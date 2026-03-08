import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Clock,
  Trophy,
  Building2,
  FlaskConical,
  Swords,
  Users,
  Wrench,
  Target,
  Lightbulb,
  AlertTriangle,
  Calendar,
  Timer,
  Zap,
} from 'lucide-react';

export default async function AllianceDuelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AllianceDuelContent locale={locale} />;
}

function AllianceDuelContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  // Alliance Duel themes by day (Day 1-6, Monday-Saturday)
  const duelThemesByDay = [
    {
      day: 1,
      dayName: isKorean ? '월요일' : 'Thứ hai',
      name: isKorean ? '차량 개조' : 'Modded Vehicle Boost',
      nameEn: 'Modded Vehicle Boost',
      icon: Wrench,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      activities: isKorean
        ? ['렌치/골든렌치 사용', '설계도 소모', '차량 부품 상자 개봉', '부머 레이드 (Lv.9-10)', '레이더 이벤트']
        : ['Dùng cờ lê/golden wrench', 'Tiêu bản vẽ', 'Mở hộp linh kiện xe', 'Raid Boomer (Lv.9-10)', 'Sự kiện Radar'],
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 2,
      dayName: isKorean ? '화요일' : 'Thứ ba',
      name: isKorean ? '건물 업그레이드' : 'Shelter Upgrade',
      nameEn: 'Shelter Upgrade',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      activities: isKorean
        ? ['건물 업그레이드 완료', '건설 가속 사용', '주황 현상금 퀘스트 우선', '피난민 모집 티켓 사용']
        : ['Hoàn thành nâng cấp công trình', 'Dùng tăng tốc xây', 'Ưu tiên bounty cam', 'Dùng vé tuyển mộ tị nạn'],
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 3,
      dayName: isKorean ? '수요일' : 'Thứ tư',
      name: isKorean ? '과학의 시대' : 'Age of Science',
      nameEn: 'Age of Science',
      icon: FlaskConical,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      activities: isKorean
        ? ['연구 완료', '연구 가속 사용', '경찰휘장 소모 연구', '인터스테이트 트럭 새로고침 (주황 퀘스트)']
        : ['Hoàn thành nghiên cứu', 'Dùng tăng tốc NC', 'NC tiêu badge', 'Refresh Interstate Truck (quest cam)'],
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 4,
      dayName: isKorean ? '목요일' : 'Thứ năm',
      name: isKorean ? '영웅 이니셔티브' : 'Hero Initiative',
      nameEn: 'Hero Initiative',
      icon: Users,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      activities: isKorean
        ? ['영웅 조각 사용', '영웅 모집 티켓 사용', '프라임 리크루트', '에너지코어 사용', '주황 장비 조각']
        : ['Dùng mảnh anh hùng', 'Dùng vé tuyển mộ anh hùng', 'Prime Recruit', 'Dùng Power Core', 'Mảnh trang bị cam'],
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 5,
      dayName: isKorean ? '금요일' : 'Thứ sáu',
      name: isKorean ? '종합 성장' : 'Holistic Growth',
      nameEn: 'Holistic Growth / Army Expansion',
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      activities: isKorean
        ? ['병력 훈련', '훈련 가속 사용', '병력 승급', '건설/연구 가속도 포인트 획득']
        : ['Huấn luyện quân', 'Dùng tăng tốc HL', 'Thăng cấp quân', 'Tăng tốc xây/NC cũng được điểm'],
      goldenHour: [
        { apoc: '08:00-12:00', korea: '19:00-23:00' },
        { apoc: '20:00-00:00', korea: '07:00-11:00' },
      ],
    },
    {
      day: 6,
      dayName: isKorean ? '토요일' : 'Thứ bảy',
      name: isKorean ? '적 파괴자' : 'Enemy Buster',
      nameEn: 'Enemy Buster',
      icon: Target,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      activities: isKorean
        ? ['적 기지 공격 (승/패 무관)', 'TvT 전투', '약한 본부(HQ) 타겟팅', '용사훈장 + 주황 장비 조각 보상']
        : ['Tấn công căn cứ địch (thắng/thua đều được)', 'Chiến đấu TvT', 'Target HQ yếu', 'Thưởng Valor Medal + mảnh trang bị cam'],
      goldenHour: null, // No matching Full Prep theme
    },
  ];

  // Full Preparedness schedule by day (for Golden Hour reference)
  const fullPrepSchedule = [
    { day: isKorean ? '일요일' : 'CN', slots: ['차량', '건물', '훈련', '연구', '영웅', '훈련'] },
    { day: isKorean ? '월요일' : 'T2', slots: ['건물', '연구', '차량', '영웅', '훈련', '차량'] },
    { day: isKorean ? '화요일' : 'T3', slots: ['연구', '영웅', '건물', '훈련', '차량', '건물'] },
    { day: isKorean ? '수요일' : 'T4', slots: ['영웅', '훈련', '연구', '차량', '건물', '연구'] },
    { day: isKorean ? '목요일' : 'T5', slots: ['훈련', '차량', '영웅', '건물', '연구', '영웅'] },
    { day: isKorean ? '금요일' : 'T6', slots: ['차량', '건물', '훈련', '연구', '영웅', '훈련'] },
    { day: isKorean ? '토요일' : 'T7', slots: ['연구', '차량', '영웅', '건물', '훈련', '영웅'] },
  ];

  const timeSlots = [
    { apoc: '00:00', korea: '11:00' },
    { apoc: '04:00', korea: '15:00' },
    { apoc: '08:00', korea: '19:00' },
    { apoc: '12:00', korea: '23:00' },
    { apoc: '16:00', korea: '03:00 (+1)' },
    { apoc: '20:00', korea: '07:00 (+1)' },
  ];

  const rewards = [
    { item: isKorean ? '영웅 경찰휘장' : 'Hero Badge', desc: isKorean ? '영웅 성급 업그레이드용' : 'Để nâng sao anh hùng' },
    { item: isKorean ? '주황 스킬북' : 'Orange Skill Book', desc: isKorean ? '영웅 스킬 레벨업' : 'Lên level skill anh hùng' },
    { item: isKorean ? '강화 합금' : 'Enhancement Alloy', desc: isKorean ? '장비 강화용' : 'Để nâng cấp trang bị' },
    { item: isKorean ? '다이아몬드' : 'Diamond', desc: isKorean ? '범용 프리미엄 재화' : 'Tiền tệ premium đa năng' },
    { item: isKorean ? '가속 아이템' : 'Speedup', desc: isKorean ? '각종 가속 아이템' : 'Các item tăng tốc' },
  ];

  const tips = [
    isKorean
      ? '영웅 조각, 모집 티켓은 반드시 4일차 목요일 Hero Initiative에만 사용!'
      : 'Mảnh anh hùng, vé tuyển mộ PHẢI dùng vào ngày 4 (Thứ tư) Hero Initiative!',
    isKorean
      ? '골든아워(전면전비 일치 시간)에 활동하면 양쪽 이벤트에서 동시 포인트 획득'
      : 'Hoạt động trong Golden Hour = nhận điểm cả 2 sự kiện cùng lúc',
    isKorean
      ? '주황 레벨 퀘스트(현상금, 트럭) 우선 - 포인트 가치가 훨씬 높음'
      : 'Ưu tiên quest cam (bounty, truck) - giá trị điểm cao hơn nhiều',
    isKorean
      ? '6일차 토요일 Enemy Buster는 전면전비와 겹치지 않음 - 언제든 공격 가능'
      : 'Ngày 6 (Thứ sáu) Enemy Buster không trùng Full Prep - tấn công bất cứ lúc nào',
    isKorean
      ? '연맹표창(AR) 연구 완료 시 렌치당 포인트 3배 이상 증가!'
      : 'Khi hoàn thành NC Alliance Recognition, điểm/wrench tăng gấp 3+!',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-intermediate">
              {t('difficulty.intermediate')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Trophy className="h-8 w-8 text-highlight" />
            {isKorean ? '연맹 대결 (Alliance Duel) 가이드' : 'Hướng dẫn Alliance Duel'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '6일간 진행되는 연맹 대결의 일차별 테마와 골든아워 전략을 상세히 알아봅니다.'
              : 'Tìm hiểu chi tiết theme theo ngày và chiến thuật Golden Hour trong Alliance Duel 6 ngày.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '월~토 6일간 진행, 일요일은 휴식일' : 'Diễn ra 6 ngày (T2-T7), Chủ nhật nghỉ'}</li>
              <li>• {isKorean ? '매일 다른 테마 - 해당 테마 활동만 포인트 획득' : 'Mỗi ngày theme khác - chỉ hoạt động đúng theme mới được điểm'}</li>
              <li>• {isKorean ? '골든아워: 전면전비와 테마가 일치할 때 (양쪽 포인트 동시 획득)' : 'Golden Hour: khi theme trùng với Full Prep (nhận điểm cả 2)'}</li>
              <li>• {isKorean ? 'Apocalypse Time = UTC-2 (한국시간 -11시간)' : 'Apocalypse Time = UTC-2 (giờ Hàn Quốc -11 tiếng)'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Apocalypse Time Explanation */}
        <Card className="border-highlight/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Timer className="h-6 w-6 text-highlight shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-highlight mb-2">
                  {isKorean ? 'Apocalypse Time (게임 서버 시간)' : 'Apocalypse Time (Giờ server game)'}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {isKorean
                    ? 'Apocalypse Time은 UTC-2 시간대입니다. 한국시간(KST)으로 변환하려면 +11시간 하세요.'
                    : 'Apocalypse Time là múi giờ UTC-2. Để chuyển sang giờ Hàn Quốc (KST), cộng thêm 11 tiếng.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  {timeSlots.map((slot) => (
                    <div key={slot.apoc} className="bg-muted/50 rounded p-2 text-center">
                      <p className="text-muted-foreground">Apoc {slot.apoc}</p>
                      <p className="font-semibold text-highlight">
                        {isKorean ? `한국 ${slot.korea}` : `Hàn ${slot.korea}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Themes - Day by Day */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            {isKorean ? '일차별 테마 (1일차~6일차)' : 'Theme theo ngày (Ngày 1-6)'}
          </h2>
          <div className="space-y-4">
            {duelThemesByDay.map((theme) => {
              const Icon = theme.icon;
              return (
                <Card key={theme.day} className={`${theme.bg} border-none`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={`${theme.color} border-current`}>
                        {isKorean ? `${theme.day}일차` : `Ngày ${theme.day}`}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{theme.dayName}</span>
                      <span className={`flex items-center gap-1 text-base ${theme.color}`}>
                        <Icon className="h-5 w-5" />
                        {theme.name}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {isKorean ? '포인트 획득 활동:' : 'Hoạt động lấy điểm:'}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {theme.activities.map((activity, idx) => (
                          <li key={idx}>• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    {theme.goldenHour ? (
                      <div className="p-2 rounded bg-yellow-500/20 border border-yellow-500/30 space-y-1">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-400" />
                          <span className="font-semibold text-yellow-400 text-sm">
                            {isKorean ? '골든아워:' : 'Golden Hour:'}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6 space-y-0.5">
                          {theme.goldenHour.map((gh, idx) => (
                            <p key={idx}>
                              Apoc {gh.apoc} = {isKorean ? '한국' : 'Hàn'} {gh.korea}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-2 rounded bg-muted/50 border border-border">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {isKorean
                            ? '전면전비와 일치하는 테마 없음 - 언제든 활동 가능'
                            : 'Không có theme Full Prep trùng - hoạt động bất cứ lúc nào'}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Golden Hour Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            {isKorean ? '골든아워 상세 설명' : 'Chi tiết Golden Hour'}
          </h2>
          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-4 space-y-4">
              <p className="text-muted-foreground">
                {isKorean
                  ? '골든아워는 연맹 대결 테마와 전면전비 테마가 일치하는 시간대입니다. 이 시간에 활동하면 두 이벤트에서 동시에 포인트를 획득할 수 있어 효율이 2배가 됩니다.'
                  : 'Golden Hour là khi theme Alliance Duel trùng với theme Full Prep. Hoạt động lúc này sẽ nhận điểm từ cả 2 sự kiện, hiệu quả gấp đôi.'}
              </p>

              {/* Golden Hour Time Windows */}
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <p className="font-bold text-yellow-400 mb-3 text-center">
                  {isKorean ? '골든아워 시간대 (매일 2회)' : 'Khung giờ Golden Hour (2 lần/ngày)'}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="text-center p-3 rounded bg-background/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      {isKorean ? '1차 골든아워' : 'Golden Hour 1'}
                    </p>
                    <p className="text-sm text-muted-foreground">Apoc 08:00 - 12:00</p>
                    <p className="font-bold text-yellow-400 text-lg">
                      {isKorean ? '한국 19:00 - 23:00' : 'Hàn 19:00 - 23:00'}
                    </p>
                  </div>
                  <div className="text-center p-3 rounded bg-background/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      {isKorean ? '2차 골든아워' : 'Golden Hour 2'}
                    </p>
                    <p className="text-sm text-muted-foreground">Apoc 20:00 - 00:00</p>
                    <p className="font-bold text-yellow-400 text-lg">
                      {isKorean ? '한국 07:00 - 11:00' : 'Hàn 07:00 - 11:00'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-2 text-muted-foreground">
                  {isKorean ? '1~5일차는 골든아워 적용, 6일차(Enemy Buster)는 해당 없음' : 'Ngày 1-5 có Golden Hour, Ngày 6 (Enemy Buster) không có'}
                </p>
              </div>

              <div className="p-3 rounded bg-muted/30 border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-highlight">💡 {isKorean ? '팁' : 'Mẹo'}:</span>{' '}
                  {isKorean
                    ? '가속 아이템, 렌치, 영웅 조각 등 중요 자원은 골든아워(19:00-23:00 또는 07:00-11:00)에 사용하세요. 같은 자원으로 2배의 보상!'
                    : 'Dùng tăng tốc, cờ lê, mảnh anh hùng trong Golden Hour (19:00-23:00 hoặc 07:00-11:00). Cùng tài nguyên nhưng thưởng gấp đôi!'}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Full Prep Schedule Reference */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '전면전비 스케줄 참고표' : 'Lịch Full Prep tham khảo'}
          </h2>
          <Card>
            <CardContent className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground">{isKorean ? '요일' : 'Ngày'}</th>
                    {timeSlots.map((slot) => (
                      <th key={slot.apoc} className="text-center p-2 text-muted-foreground text-xs">
                        <div>{slot.apoc}</div>
                        <div className="text-highlight">{slot.korea}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fullPrepSchedule.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="p-2 font-medium">{row.day}</td>
                      {row.slots.map((slot, slotIdx) => (
                        <td key={slotIdx} className="text-center p-2 text-xs text-muted-foreground">
                          {slot}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {isKorean
                  ? '* 상단: Apocalypse Time / 하단: 한국시간 (KST)'
                  : '* Trên: Apocalypse Time / Dưới: Giờ Hàn Quốc (KST)'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '흔한 실수 - 반드시 피해야 할 것' : 'Sai lầm phổ biến - PHẢI tránh'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '영웅 조각/모집 티켓을 4일차 목요일 외에 사용' : 'Dùng mảnh anh hùng/vé tuyển mộ ngoài ngày 4 (Thứ năm)'}</li>
                  <li>• {isKorean ? '렌치를 1일차 월요일 외에 사용' : 'Dùng cờ lê ngoài ngày 1 (Thứ hai)'}</li>
                  <li>• {isKorean ? '골든아워 외 시간에 가속 아이템 대량 소모' : 'Dùng nhiều tăng tốc ngoài Golden Hour'}</li>
                  <li>• {isKorean ? '주황 레벨 퀘스트(현상금, 트럭) 무시' : 'Bỏ qua quest cấp cam (bounty, truck)'}</li>
                  <li>• {isKorean ? '6일차 토요일에 무작정 강한 적 공격 (병력 손실 주의)' : 'Ngày 6 (Thứ bảy) tấn công địch mạnh bừa bãi (coi chừng mất quân)'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '보상 (최대 9개 상자)' : 'Phần thưởng (tối đa 9 hộp)'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {rewards.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{r.item}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                {isKorean
                  ? '점수 마일스톤 달성 시 상자 해금 + 글로벌 순위 보상'
                  : 'Mở hộp khi đạt điểm milestone + thưởng xếp hạng global'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '전략 팁' : 'Mẹo chiến thuật'}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">
              {isKorean ? '참고 자료: ' : 'Nguồn tham khảo: '}
              <a href="https://bacons-last-z-guide.fandom.com/wiki/Alliance_Duel" className="text-highlight hover:underline" target="_blank" rel="noopener noreferrer">
                Bacon&apos;s Guide Wiki
              </a>
              {', '}
              <a href="https://lastz.fandom.com/wiki/Apocalypse_Time" className="text-highlight hover:underline" target="_blank" rel="noopener noreferrer">
                Last Z Wiki
              </a>
              {', '}
              <a href="https://lastzdata.com/home/alliance-duel/" className="text-highlight hover:underline" target="_blank" rel="noopener noreferrer">
                LastZData
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
