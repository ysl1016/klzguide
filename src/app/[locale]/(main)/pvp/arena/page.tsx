import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Swords, Lightbulb, AlertTriangle, Trophy, Gem, ShoppingCart, Shield, CheckSquare, Target } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  return {
    title: l('아레나 가이드 | KLZ Guide', 'Hướng dẫn Đấu trường | KLZ Guide', 'Arena Guide | KLZ Guide'),
    description: l(
      '아레나 시스템 완벽 가이드 - 주간 다이아 보상, 상점 우선순위, 상대 선택 전략',
      'Hướng dẫn hoàn chỉnh Đấu trường - thưởng kim cương tuần, ưu tiên shop, chiến thuật chọn đối thủ',
      'Complete Arena guide - weekly diamond rewards, shop priority, opponent selection strategy'
    ),
  };
}

export default async function ArenaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ArenaContent locale={locale} />;
}

function ArenaContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const weeklyRewards = [
    { rank: '1', diamonds: '5,000', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: '1st' },
    { rank: '2', diamonds: '3,000', color: 'text-gray-300', bg: 'bg-gray-500/10', icon: '2nd' },
    { rank: '3-5', diamonds: '2,000', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: '3-5' },
    { rank: '6-10', diamonds: '1,500', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: '6-10' },
    { rank: '11-20', diamonds: '1,000', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: '11-20' },
    { rank: '21-50', diamonds: '500', color: 'text-green-400', bg: 'bg-green-500/10', icon: '21-50' },
    { rank: '51-100', diamonds: '300', color: 'text-teal-400', bg: 'bg-teal-500/10', icon: '51+' },
    { rank: '101+', diamonds: '100', color: 'text-muted-foreground', bg: 'bg-muted/30', icon: '101+' },
  ];

  const shopPriority = [
    {
      rank: 1,
      item: l('영웅 파편 (핵심 영웅)', 'Hero Shards (Core Heroes)', 'Hero Shards (Core Heroes)'),
      reason: l('영웅 승급에 필수 - 가장 높은 가성비', 'Cần cho thăng cấp hero - giá trị cao nhất', 'Essential for hero promotion - best value'),
      color: 'text-yellow-400',
    },
    {
      rank: 2,
      item: l('가속 아이템', 'Speed-up Items', 'Speed-up Items'),
      reason: l('건설/연구 가속에 항상 유용', 'Luôn hữu ích cho xây dựng/nghiên cứu', 'Always useful for construction/research speed-ups'),
      color: 'text-blue-400',
    },
    {
      rank: 3,
      item: l('장비 재료', 'Equipment Materials', 'Equipment Materials'),
      reason: l('장비 강화에 필요한 재료 확보', 'Lấy vật liệu nâng cấp trang bị', 'Acquire materials for gear enhancement'),
      color: 'text-purple-400',
    },
    {
      rank: 4,
      item: l('자원 상자', 'Resource Boxes', 'Resource Boxes'),
      reason: l('잉여 코인이 있을 때만 구매', 'Chỉ mua khi dư coin', 'Only buy when you have excess coins'),
      color: 'text-green-400',
    },
  ];

  const opponentStrategy = [
    {
      type: l('전투력이 낮은 상대', 'Đối thủ CP thấp hơn', 'Lower CP opponent'),
      action: l('우선 공격', 'Tấn công ưu tiên', 'Attack first'),
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: l('승리 확률 높음 - 안정적인 포인트 획득', 'Xác suất thắng cao - tích điểm ổn định', 'High win rate - stable point gain'),
    },
    {
      type: l('비슷한 전투력', 'CP tương đương', 'Similar CP'),
      action: l('진형 확인 후 도전', 'Kiểm tra đội hình rồi đánh', 'Check formation before challenging'),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: l('상대 진형을 카운터할 수 있으면 도전', 'Đánh nếu counter được đội hình đối thủ', 'Challenge if you can counter their formation'),
    },
    {
      type: l('전투력이 높은 상대', 'Đối thủ CP cao hơn', 'Higher CP opponent'),
      action: l('피하기', 'Tránh', 'Avoid'),
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      desc: l('패배 시 순위 하락 - 리스크 대비 보상 낮음', 'Thua sẽ tụt hạng - rủi ro không đáng', 'Losing drops rank - risk not worth the reward'),
    },
  ];

  const defenseFormation = [
    l('방어 진형은 가장 강한 영웅 조합으로 배치하세요', 'Đặt đội hình phòng thủ với tổ hợp hero mạnh nhất', 'Set your defense formation with your strongest hero lineup'),
    l('탱커를 전열에, 딜러를 후열에 배치', 'Tank ở hàng trước, dealer ở hàng sau', 'Place tanks in the front row, DPS in the back row'),
    l('힐러가 있다면 반드시 포함 - 방어 승률이 크게 올라갑니다', 'Nếu có healer nhất định phải dùng - tỷ lệ thắng phòng thủ tăng nhiều', 'Always include a healer if you have one - defense win rate increases significantly'),
    l('매주 메타에 맞게 진형을 조정하세요', 'Điều chỉnh đội hình theo meta mỗi tuần', 'Adjust your formation to match the weekly meta'),
  ];

  const dailyChecklist = [
    { task: l('아레나 5회 참가', 'Tham gia Arena 5 lần', 'Enter Arena 5 times'), priority: l('필수', 'Bắt buộc', 'Required'), color: 'text-red-400' },
    { task: l('상대 목록 확인 (낮은 CP 우선)', 'Kiểm tra danh sách đối thủ (CP thấp trước)', 'Check opponent list (lower CP first)'), priority: l('중요', 'Quan trọng', 'Important'), color: 'text-yellow-400' },
    { task: l('방어 진형 업데이트', 'Cập nhật đội hình phòng thủ', 'Update defense formation'), priority: l('주간', 'Hàng tuần', 'Weekly'), color: 'text-blue-400' },
    { task: l('아레나 상점 코인 사용', 'Dùng coin Arena shop', 'Spend Arena shop coins'), priority: l('코인 충분 시', 'Khi đủ coin', 'When enough coins'), color: 'text-green-400' },
  ];

  const tips = [
    l(
      '매일 5경기 무조건 참가 - 보상 다이아는 무과금 핵심 수입원입니다',
      'Nhất định tham gia 5 trận mỗi ngày - kim cương thưởng là nguồn thu chính F2P',
      'Always play 5 matches daily - diamond rewards are a key F2P income source'
    ),
    l(
      '전투력이 낮은 상대를 먼저 공격하세요 - 안전한 승리가 최선입니다',
      'Tấn công đối thủ CP thấp trước - thắng an toàn là tốt nhất',
      'Attack lower CP opponents first - safe wins are the best strategy'
    ),
    l(
      '주간 보상은 월요일 초기화 - 일요일에 순위 밀어올리세요',
      'Thưởng tuần reset thứ Hai - đẩy hạng vào Chủ Nhật',
      'Weekly rewards reset Monday - push rank on Sunday'
    ),
    l(
      '아레나 상점은 영웅 파편이 최우선 구매 대상입니다',
      'Arena shop ưu tiên mua hero shards',
      'Hero shards are the top priority in the Arena shop'
    ),
    l(
      '방어 진형을 비워두지 마세요 - 다른 플레이어의 쉬운 포인트가 됩니다',
      'Đừng để trống đội hình phòng thủ - sẽ thành điểm miễn phí cho người khác',
      'Never leave your defense formation empty - you become free points for others'
    ),
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Swords className="h-8 w-8 text-highlight" />
            {l('아레나 가이드', 'Hướng dẫn Đấu trường (Arena)', 'Arena Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '매일 5경기 필수 참가! 주간 다이아 보상은 무과금 플레이어의 핵심 수입원입니다.',
              'Nhất định tham gia 5 trận mỗi ngày! Thưởng kim cương tuần là nguồn thu chính cho F2P.',
              'Play 5 matches daily! Weekly diamond rewards are a core income source for F2P players.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tom tat', 'Key Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('매일 5경기 필수 - 무조건 참가하세요', 'Nhất định 5 trận mỗi ngày', 'Play 5 matches daily - always participate')}</li>
              <li>• {l('주간 1위: 5,000 다이아, 상위권 유지가 핵심', '1st tuần: 5,000 kim cương, giữ hạng cao là chìa khóa', 'Weekly 1st: 5,000 diamonds, staying in top ranks is key')}</li>
              <li>• {l('낮은 전투력 상대 우선 공격 = 안전한 승리', 'Tấn công đối thủ CP thấp trước = thắng an toàn', 'Attack lower CP opponents first = safe wins')}</li>
              <li>• {l('아레나 상점: 영웅 파편 최우선 구매', 'Arena shop: ưu tiên mua hero shards', 'Arena shop: hero shards are top priority')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Weekly Diamond Rewards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gem className="h-6 w-6 text-blue-400" />
            {l('주간 다이아 보상', 'Thưởng kim cương hàng tuần', 'Weekly Diamond Rewards')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {weeklyRewards.map((reward, idx) => (
                  <div key={idx} className={`text-center p-4 rounded-lg ${reward.bg}`}>
                    <div className="flex items-center justify-center mb-1">
                      <Trophy className={`h-5 w-5 ${reward.color} mr-1`} />
                      <span className={`text-sm font-medium ${reward.color}`}>
                        {l(`${reward.rank}위`, `Hạng ${reward.rank}`, `Rank ${reward.rank}`)}
                      </span>
                    </div>
                    <p className={`text-2xl font-bold ${reward.color}`}>{reward.diamonds}</p>
                    <p className="text-xs text-muted-foreground">{l('다이아', 'Kim cương', 'Diamonds')}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {l(
                  '* 보상은 매주 월요일 초기화됩니다',
                  '* Thưởng reset mỗi thứ Hai',
                  '* Rewards reset every Monday'
                )}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Arena Shop Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-green-400" />
            {l('아레나 상점 구매 우선순위', 'Ưu tiên mua Arena Shop', 'Arena Shop Purchase Priority')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ol className="space-y-4">
                {shopPriority.map((item) => (
                  <li key={item.rank} className="flex gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-sm`}>
                      {item.rank}
                    </span>
                    <div>
                      <p className={`font-semibold ${item.color}`}>{item.item}</p>
                      <p className="text-xs text-muted-foreground">{item.reason}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Opponent Selection Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-red-400" />
            {l('상대 선택 전략', 'Chiến thuật chọn đối thủ', 'Opponent Selection Strategy')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {opponentStrategy.map((strat, idx) => (
              <Card key={idx} className={`${strat.bg} border-none`}>
                <CardContent className="p-4">
                  <Badge variant="outline" className={`${strat.color} border-current/30 mb-2`}>
                    {strat.action}
                  </Badge>
                  <p className={`font-semibold ${strat.color} mb-1`}>{strat.type}</p>
                  <p className="text-xs text-muted-foreground">{strat.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Defense Formation Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-400" />
            {l('방어 진형 팁', 'Mẹo đội hình phòng thủ', 'Defense Formation Tips')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {defenseFormation.map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Daily Arena Checklist */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-green-400" />
            {l('일일 아레나 체크리스트', 'Checklist Arena hàng ngày', 'Daily Arena Checklist')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {dailyChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded border-2 border-muted-foreground/30" />
                      <span className="text-sm">{item.task}</span>
                    </div>
                    <Badge variant="outline" className={`${item.color} border-current/30 text-xs`}>
                      {item.priority}
                    </Badge>
                  </div>
                ))}
              </div>
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
                  {l('절대 하지 마세요', 'ĐỪNG làm những điều này', 'Never Do This')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {l('아레나 5경기 스킵 - 매일 다이아를 놓치게 됩니다', 'Bỏ 5 trận Arena - sẽ mất kim cương mỗi ngày', 'Skip Arena 5 matches - you lose diamonds every day')}</li>
                  <li>• {l('전투력이 훨씬 높은 상대 도전 - 순위만 떨어집니다', 'Đánh đối thủ CP cao hơn nhiều - chỉ tụt hạng', 'Challenge much higher CP opponents - you only drop rank')}</li>
                  <li>• {l('방어 진형 비워두기 - 무료 포인트를 제공하는 꼴입니다', 'Để trống phòng thủ - cho điểm miễn phí', 'Leave defense empty - you give away free points')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('팁', 'Mẹo', 'Tips')}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
