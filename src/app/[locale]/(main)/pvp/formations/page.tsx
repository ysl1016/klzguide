import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Swords, Shield, Users, Target, Lightbulb, AlertTriangle } from 'lucide-react';

export default async function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FormationsContent locale={locale} />;
}

function FormationsContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const formations = [
    {
      name: isKorean ? '공격 진형' : 'Đội hình tấn công',
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      description: isKorean
        ? '적 기지 공격, 랠리 시 사용'
        : 'Dùng khi tấn công căn cứ địch, rally',
      composition: isKorean
        ? 'DPS 영웅 3 + 서포트 2 또는 DPS 4 + 탱커 1'
        : 'DPS 3 + Support 2 hoặc DPS 4 + Tank 1',
      troops: isKorean ? '돌격/슈터 위주' : 'Chủ yếu Assaulter/Shooter',
    },
    {
      name: isKorean ? '방어 진형' : 'Đội hình phòng thủ',
      icon: Shield,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      description: isKorean
        ? '기지 방어, 수비 시 사용'
        : 'Dùng khi phòng thủ căn cứ',
      composition: isKorean
        ? '탱커 2 + DPS 2 + 서포트 1'
        : 'Tank 2 + DPS 2 + Support 1',
      troops: isKorean ? '라이더 + 균형 병종' : 'Rider + quân cân bằng',
    },
    {
      name: isKorean ? '랠리 진형' : 'Đội hình Rally',
      icon: Target,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      description: isKorean
        ? '연맹 랠리, 대규모 공격 시 사용'
        : 'Dùng cho rally liên minh, tấn công lớn',
      composition: isKorean
        ? '동일 진영 5명 (시너지 극대화)'
        : '5 người cùng phe (tối đa synergy)',
      troops: isKorean ? '고티어 병종 집중' : 'Tập trung quân tier cao',
    },
  ];

  const counterChart = [
    {
      faction: isKorean ? '새벽의 날개' : 'Cánh Bình Minh',
      strong: isKorean ? '블러디 로즈' : 'Blood Rose',
      weak: isKorean ? '질서의 수호자' : 'Người Bảo Vệ Trật Tự',
      color: 'text-blue-400',
    },
    {
      faction: isKorean ? '블러디 로즈' : 'Blood Rose',
      strong: isKorean ? '질서의 수호자' : 'Người Bảo Vệ Trật Tự',
      weak: isKorean ? '새벽의 날개' : 'Cánh Bình Minh',
      color: 'text-red-400',
    },
    {
      faction: isKorean ? '질서의 수호자' : 'Người Bảo Vệ Trật Tự',
      strong: isKorean ? '새벽의 날개' : 'Cánh Bình Minh',
      weak: isKorean ? '블러디 로즈' : 'Blood Rose',
      color: 'text-green-400',
    },
  ];

  const troopTypes = [
    {
      name: isKorean ? '돌격 (Assaulter)' : 'Assaulter',
      strength: isKorean ? '높은 공격력' : 'ATK cao',
      weakness: isKorean ? '낮은 방어력' : 'DEF thấp',
      use: isKorean ? '공격 진형, 블러디 로즈' : 'Đội hình tấn công, Blood Rose',
      color: 'text-red-400',
    },
    {
      name: isKorean ? '슈터 (Shooter)' : 'Shooter',
      strength: isKorean ? '균형 잡힌 스탯' : 'Stat cân bằng',
      weakness: isKorean ? '특화 없음' : 'Không chuyên biệt',
      use: isKorean ? '범용, 새벽의 날개' : 'Đa năng, Cánh Bình Minh',
      color: 'text-blue-400',
    },
    {
      name: isKorean ? '라이더 (Rider)' : 'Rider',
      strength: isKorean ? '높은 HP/방어' : 'HP/DEF cao',
      weakness: isKorean ? '낮은 공격력' : 'ATK thấp',
      use: isKorean ? '방어 진형, 질서의 수호자' : 'Đội hình phòng thủ, Người Bảo Vệ Trật Tự',
      color: 'text-green-400',
    },
  ];

  const tips = [
    isKorean
      ? '서버 70%가 블러디 로즈 선택 → 새벽의 날개 카운터로 유리'
      : '70% server chọn Blood Rose → counter Cánh Bình Minh có lợi',
    isKorean
      ? '동일 진영 5명 = 히든 버프 발동 (공격/방어/병력 스탯 증가)'
      : '5 người cùng phe = buff ẩn (tăng ATK/DEF/stat quân)',
    isKorean
      ? '영웅 스킬과 병종 매칭 필수 - 슈터 버프 영웅 = 슈터 병종'
      : 'Bắt buộc kết hợp skill anh hùng với loại quân',
    isKorean
      ? '고티어 소수 병력 > 저티어 다수 병력'
      : 'Ít quân tier cao > nhiều quân tier thấp',
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
              15 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8 text-highlight" />
            {isKorean ? '진형 조합 가이드' : 'Hướng dẫn kết hợp đội hình'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '공격/방어/랠리 진형 구성과 카운터 시스템을 알아봅니다.'
              : 'Tìm hiểu cấu trúc đội hình tấn công/phòng thủ/rally và hệ thống counter.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '카운터: 새벽의 날개 > 블러디 로즈 > 질서의 수호자 > 새벽의 날개' : 'Counter: Cánh Bình Minh > Blood Rose > Người Bảo Vệ Trật Tự > Cánh Bình Minh'}</li>
              <li>• {isKorean ? '동일 진영 5명 = 히든 버프 (최대 시너지)' : '5 người cùng phe = buff ẩn (synergy tối đa)'}</li>
              <li>• {isKorean ? '영웅 스킬과 병종 타입 매칭 필수' : 'Bắt buộc kết hợp skill anh hùng với loại quân'}</li>
              <li>• {isKorean ? '고티어 소수 > 저티어 다수' : 'Ít tier cao > nhiều tier thấp'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Formation Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '진형 유형' : 'Loại đội hình'}
          </h2>
          <div className="space-y-4">
            {formations.map((formation) => {
              const Icon = formation.icon;
              return (
                <Card key={formation.name} className={`${formation.border} ${formation.bg}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Icon className={`h-8 w-8 ${formation.color} shrink-0`} />
                      <div className="flex-1">
                        <h3 className={`font-semibold ${formation.color} mb-1`}>{formation.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{formation.description}</p>
                        <div className="grid gap-2 sm:grid-cols-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">{isKorean ? '구성:' : 'Cấu thành:'}</span>
                            <span className="ml-2">{formation.composition}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">{isKorean ? '병종:' : 'Quân:'}</span>
                            <span className="ml-2">{formation.troops}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Counter System */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '카운터 시스템' : 'Hệ thống Counter'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">{isKorean ? '진영' : 'Phe'}</th>
                      <th className="text-left p-2">{isKorean ? '강함 (승리)' : 'Mạnh (thắng)'}</th>
                      <th className="text-left p-2">{isKorean ? '약함 (패배)' : 'Yếu (thua)'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {counterChart.map((row) => (
                      <tr key={row.faction} className="border-b border-border/50">
                        <td className={`p-2 font-semibold ${row.color}`}>{row.faction}</td>
                        <td className="p-2 text-green-400">→ {row.strong}</td>
                        <td className="p-2 text-red-400">← {row.weak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <div className="info-important flex gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '서버 대부분(~70%)이 블러디 로즈를 선택합니다. 새벽의 날개 선택 시 카운터 이점을 얻을 수 있습니다.'
                : 'Đa số server (~70%) chọn Blood Rose. Chọn Cánh Bình Minh có lợi thế counter.'}
            </p>
          </div>
        </section>

        {/* Troop Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '병종 특성' : 'Đặc điểm loại quân'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {troopTypes.map((troop) => (
              <Card key={troop.name}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-lg ${troop.color}`}>{troop.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-green-400">+</span>
                    <span className="text-muted-foreground">{troop.strength}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-red-400">-</span>
                    <span className="text-muted-foreground">{troop.weakness}</span>
                  </div>
                  <Badge variant="outline" className={`mt-2 ${troop.color}`}>{troop.use}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mixed Formation Meta */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4 space-y-3">
            <p className="font-semibold text-highlight">
              {isKorean ? '3+2 혼합 진형이 유리한 이유' : 'Tại sao đội hình trộn 3+2 có lợi'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '서버 플레이어의 약 70%가 블러디 로즈를 선택합니다. 새벽의 날개 3명 + 블러디 로즈 2명 구성은 대부분의 상대를 카운터하면서 시즌 시너지 보너스도 확보합니다. 120M 새벽의 날개 진형이 130M 블러디 로즈 진형을 이길 수 있습니다 — 진영 우위가 1,000만 전투력 차이를 극복합니다.'
                : 'Khoảng 70% người chơi server chọn Blood Rose. Đội hình Wings of Dawn 3 + Blood Rose 2 counter đa số đối thủ và có bonus season synergy. Đội 120M WoD thắng 130M BR — lợi thế phe vượt qua 10M chênh lệch CP.'}
            </p>
          </CardContent>
        </Card>

        {/* Commander Slot */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-4 space-y-2">
            <p className="font-semibold text-blue-400">
              {isKorean ? '지휘관 슬롯 배치 규칙' : 'Quy tắc đặt slot Chỉ huy'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isKorean
                ? '지휘관 슬롯에는 전체 병종 버프 영웅을 배치하세요 — 추가 보너스가 적용됩니다. 추천 영웅: 퀴니, 릴리아나. 유틸 전용 영웅(레이더, 자원 생산)은 전투 진형에서 제외하세요.'
                : 'Đặt anh hùng buff toàn quân ở slot Chỉ huy — có bonus thêm. Đề xuất: Queenie, Liliana. Loại bỏ anh hùng utility (radar, sản xuất tài nguyên) khỏi đội hình chiến đấu.'}
            </p>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '진형 팁' : 'Mẹo đội hình'}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Team Compositions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-highlight" />
            {isKorean ? '추천 팀 구성' : 'Doi hinh khuyen nghi'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-400">
                  {isKorean ? '메인 푸시 (3 WoD + 2 BR)' : 'Main Push (3 WoD + 2 BR)'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="space-y-1">
                  <p className="text-blue-400 font-medium">{isKorean ? '새벽의 날개' : 'Canh Binh Minh'}</p>
                  <p className="text-muted-foreground">Queenie, Liliana, Alma</p>
                </div>
                <div className="space-y-1">
                  <p className="text-red-400 font-medium">{isKorean ? '블러디 로즈' : 'Blood Rose'}</p>
                  <p className="text-muted-foreground">Yu Chan, Licia</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-green-400">
                  {isKorean ? 'F2P 균형' : 'F2P Can bang'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Laura ({isKorean ? '탱크' : 'Tank'}), Amelia, Christina</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Sophia, Miranda</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-yellow-400">
                  {isKorean ? '질서의 수호자' : 'Nguoi Bao Ve Trat Tu'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Amber, Dodemeki, Harleyena</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Sakura, Mia</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chip System Warning */}
        <section className="space-y-4">
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                {isKorean ? '칩 시스템 경고' : 'Canh bao he thong Chip'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">!</span>
                  <span className="text-muted-foreground">
                    {isKorean
                      ? '각 진형마다 별도 칩이 필요합니다.'
                      : 'Moi doi hinh can chip rieng.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">!</span>
                  <span className="text-muted-foreground">
                    {isKorean
                      ? '메인 진영을 칩 도착 전에 결정해야 합니다.'
                      : 'Phai quyet dinh phe chinh truoc khi nhan chip.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive font-bold">!</span>
                  <span className="text-muted-foreground">
                    {isKorean
                      ? '진영 변경 후 칩 재투자 비용이 매우 높습니다.'
                      : 'Chi phi tai dau tu chip sau khi doi phe rat cao.'}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
