'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock,
  Gem,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Gift,
} from 'lucide-react';

function StoreCTA({ l }: { l: (ko: string, vi: string, en: string) => string }) {
  return (
    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-bold flex items-center gap-2 justify-center sm:justify-start">
            <Gem className="h-5 w-5 text-yellow-400" />
            {l('공식 골드바 스토어 바로가기', 'Truy cập Cửa hàng Gold Bar chính thức', 'Official Gold Bar Store')}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {l(
              'store.last-z.com에서 추가 보너스와 함께 골드바를 구매하세요',
              'Mua Gold Bar với bonus thêm tại store.last-z.com',
              'Buy Gold Bars with bonus rewards at store.last-z.com'
            )}
          </p>
        </div>
        <a
          href="https://store.last-z.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors shrink-0"
        >
          {l('스토어 열기', 'Mở cửa hàng', 'Open Store')}
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export function GoldBarStoreContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const purchaseSteps = [
    {
      step: 1,
      title: l('스토어 접속', 'Truy cập cửa hàng', 'Visit the Store'),
      desc: l(
        'store.last-z.com에 접속합니다',
        'Truy cập store.last-z.com',
        'Go to store.last-z.com'
      ),
    },
    {
      step: 2,
      title: l('UID 입력', 'Nhập UID', 'Enter Your UID'),
      desc: l(
        '본인의 게임 UID를 입력하여 로그인합니다',
        'Nhập UID game của bạn để đăng nhập',
        'Log in by entering your in-game UID'
      ),
      warning: l(
        '반드시 본인 UID가 맞는지 확인하세요. 골드바는 UID 간 이전이 불가능합니다.',
        'Hãy chắc chắn UID là đúng. Gold Bar không thể chuyển giữa các UID.',
        'Make sure your UID is correct. Gold Bars cannot be transferred between UIDs.'
      ),
    },
    {
      step: 3,
      title: l('상품 선택', 'Chọn gói', 'Select a Package'),
      desc: l(
        '원하는 골드바 상품을 선택합니다',
        'Chọn gói Gold Bar bạn muốn',
        'Choose the Gold Bar package you want'
      ),
    },
    {
      step: 4,
      title: l('결제 완료', 'Thanh toán', 'Complete Payment'),
      desc: l(
        '결제 수단을 선택하고 결제를 완료합니다',
        'Chọn phương thức thanh toán và hoàn tất',
        'Select your payment method and complete the purchase'
      ),
    },
  ];

  const iosSteps = [
    l('Safari에서 store.last-z.com 접속', 'Mở store.last-z.com bằng Safari', 'Open store.last-z.com in Safari'),
    l('하단 공유 버튼(□↑ 아이콘) 탭', 'Nhấn nút chia sẻ (□↑) ở dưới cùng', 'Tap the Share button (□↑) at the bottom'),
    l('스크롤하여 "홈 화면에 추가" 선택', 'Cuộn và chọn "Thêm vào Màn hình chính"', 'Scroll and select "Add to Home Screen"'),
    l('이름 확인 후 우측 상단 "추가" 탭', 'Xác nhận tên rồi nhấn "Thêm" ở góc phải', 'Confirm the name and tap "Add" in the top right'),
  ];

  const androidSteps = [
    l('Chrome에서 store.last-z.com 접속', 'Mở store.last-z.com bằng Chrome', 'Open store.last-z.com in Chrome'),
    l('우측 상단 ⋮ (더보기 메뉴) 탭', 'Nhấn ⋮ (menu thêm) ở góc phải trên', 'Tap ⋮ (More menu) in the top right'),
    l('"홈 화면에 추가" 또는 "앱 설치" 선택', 'Chọn "Thêm vào Màn hình chính" hoặc "Cài đặt ứng dụng"', 'Select "Add to Home screen" or "Install app"'),
    l('"추가" 버튼으로 확인', 'Nhấn "Thêm" để xác nhận', 'Tap "Add" to confirm'),
  ];

  const milestones = [
    {
      amount: '3,000',
      reward: l('만능 주황 영웅 조각', 'Mảnh anh hùng cam đa năng', 'Universal Orange Hero Fragments'),
    },
    {
      amount: '1,000,000',
      reward: l('골드렌치 + 스펙타큘러(30일)', 'Golden Wrench + Spectacular (30 ngày)', 'Golden Wrench + Spectacular (30 days)'),
    },
    {
      amount: '1,200,000',
      reward: l('경찰휘장 + 네뷸라(30일)', 'Huy hiệu cảnh sát + Nebula (30 ngày)', 'Badges + Nebula (30 days)'),
    },
  ];

  const thirdPartyPlatforms = [
    {
      title: 'LDShop',
      desc: l('할인 충전 가능', 'Có thể nạp giảm giá', 'Discounted top-up available'),
      href: 'https://www.ldshop.gg/top-up/last-z-survival-shooter.html',
    },
    {
      title: 'LootBar',
      desc: l('정기 할인 이벤트', 'Sự kiện giảm giá định kỳ', 'Regular discount events'),
      href: 'https://lootbar.gg/top-up/last-z-survival-shooter',
    },
    {
      title: 'BuffBuff',
      desc: l('다양한 결제 옵션', 'Nhiều phương thức thanh toán', 'Various payment options'),
      href: 'https://buffbuff.com/top-up/lzss',
    },
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* (1) Header */}
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
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Gem className="h-8 w-8 text-yellow-400" />
            {l('골드바 스토어 가이드', 'Hướng dẫn Cửa hàng Gold Bar', 'Gold Bar Store Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '공식 골드바 스토어 이용법, 충전 보너스, 리차지 이벤트 보상을 알아봅니다.',
              'Hướng dẫn sử dụng cửa hàng Gold Bar chính thức, bonus nạp và phần thưởng mốc nạp.',
              'Learn how to use the official Gold Bar Store, recharge bonuses, and milestone rewards.'
            )}
          </p>
        </div>

        {/* (2) TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Takeaways')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l(
                '공식 스토어에서 골드바를 구매하면 추가 보너스를 받을 수 있다',
                'Mua Gold Bar tại cửa hàng chính thức sẽ nhận bonus thêm',
                'Purchasing Gold Bars from the official store gives you bonus rewards'
              )}</li>
              <li>• {l(
                '리차지 이벤트 기간에 충전하면 마일스톤 보상까지 획득 가능',
                'Nạp trong sự kiện Recharge sẽ nhận thêm phần thưởng mốc nạp',
                'Recharging during Recharge Events earns additional milestone rewards'
              )}</li>
              <li>• {l(
                '충전 전 반드시 본인 UID를 확인해야 한다',
                'Phải kiểm tra UID trước khi nạp',
                'Always verify your UID before recharging'
              )}</li>
            </ul>
          </CardContent>
        </Card>

        {/* (3) Store CTA - Top */}
        <StoreCTA l={l} />

        {/* (4) What are Gold Bars? */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('골드바란?', 'Gold Bar là gì?', 'What are Gold Bars?')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3 text-sm text-muted-foreground">
              <p>{l(
                '골드바는 Last Z: Survival Shooter의 프리미엄 재화로, 공식 스토어(store.last-z.com)에서 현금으로 구매할 수 있습니다.',
                'Gold Bar là tiền tệ cao cấp trong Last Z: Survival Shooter, có thể mua bằng tiền thật tại cửa hàng chính thức (store.last-z.com).',
                'Gold Bars are the premium currency in Last Z: Survival Shooter, purchasable with real money from the official store (store.last-z.com).'
              )}</p>
              <p>{l(
                '인게임에서 다이아몬드, 아이템 등으로 교환할 수 있습니다.',
                'Có thể đổi thành kim cương, vật phẩm trong game.',
                'They can be exchanged for diamonds, items, and more in-game.'
              )}</p>
              <p className="text-yellow-400 font-medium">{l(
                '최신 교환 비율과 상품 정보는 store.last-z.com에서 확인하세요.',
                'Kiểm tra tỷ lệ quy đổi và thông tin gói mới nhất tại store.last-z.com.',
                'Check the latest exchange rates and package info at store.last-z.com.'
              )}</p>
            </CardContent>
          </Card>
        </section>

        {/* (5) How to Purchase */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('구매 방법', 'Cách mua', 'How to Purchase')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {purchaseSteps.map((step) => (
              <Card key={step.step}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-sm">
                      {step.step}
                    </div>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                      {step.warning && (
                        <div className="mt-2 flex gap-2 p-2 rounded-lg bg-destructive/10 text-destructive text-xs">
                          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                          <p>{step.warning}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* (6) Add to Home Screen */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-highlight" />
            {l('스토어를 홈화면에 추가하기', 'Thêm cửa hàng vào màn hình chính', 'Add Store to Home Screen')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {l(
              '자주 이용한다면 홈화면에 추가해두면 앱처럼 한 번의 터치로 접근할 수 있습니다.',
              'Nếu bạn sử dụng thường xuyên, thêm vào màn hình chính để truy cập nhanh như ứng dụng.',
              'If you use it often, add it to your home screen for quick one-tap access like an app.'
            )}
          </p>
          <Tabs defaultValue="ios">
            <TabsList>
              <TabsTrigger value="ios">iOS (iPhone/iPad)</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>
            <TabsContent value="ios">
              <Card>
                <CardContent className="p-4 space-y-3">
                  {iosSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="android">
              <Card>
                <CardContent className="p-4 space-y-3">
                  {androidSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-tip" />
            {l(
              '설정 완료! 홈화면의 아이콘을 탭하면 바로 스토어가 열립니다.',
              'Hoàn tất! Nhấn biểu tượng trên màn hình chính để mở cửa hàng ngay.',
              'All set! Tap the icon on your home screen to open the store instantly.'
            )}
          </p>
        </section>

        {/* (7) Recharge Bonus */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('충전 보너스', 'Bonus nạp', 'Recharge Bonus')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                {l(
                  '충전 금액에 따라 추가 골드바 보너스가 제공됩니다. 금액이 클수록 보너스 비율이 높아집니다.',
                  'Bonus Gold Bar thêm được cung cấp theo số tiền nạp. Nạp càng nhiều, tỷ lệ bonus càng cao.',
                  'Additional Gold Bar bonuses are provided based on the recharge amount. Larger amounts give higher bonus rates.'
                )}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-2">{l('충전 금액', 'Số tiền nạp', 'Recharge Amount')}</th>
                      <th className="text-left p-2">{l('추가 보너스', 'Bonus thêm', 'Bonus')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-muted-foreground" colSpan={2}>
                        {l(
                          '최신 보너스 정보는 store.last-z.com에서 직접 확인하세요',
                          'Kiểm tra thông tin bonus mới nhất tại store.last-z.com',
                          'Check the latest bonus info at store.last-z.com'
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-yellow-400">
                {l(
                  '* 보너스 비율은 수시로 변경될 수 있습니다.',
                  '* Tỷ lệ bonus có thể thay đổi bất cứ lúc nào.',
                  '* Bonus rates may change at any time.'
                )}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* (8) Recharge Event Milestones */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('리차지 이벤트 마일스톤', 'Mốc nạp sự kiện Recharge', 'Recharge Event Milestones')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                {l(
                  '리차지 이벤트는 기간 한정으로 진행되며, 누적 골드바 구매량에 따른 마일스톤 보상을 받을 수 있습니다. 보상은 시즌마다 변경될 수 있습니다.',
                  'Sự kiện Recharge diễn ra trong thời gian giới hạn. Bạn nhận phần thưởng mốc nạp dựa trên tổng Gold Bar đã mua. Phần thưởng có thể thay đổi theo mùa.',
                  'Recharge Events run for limited periods. You receive milestone rewards based on cumulative Gold Bar purchases. Rewards may change each season.'
                )}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-2">{l('누적 골드바', 'Tổng Gold Bar', 'Cumulative Gold Bars')}</th>
                      <th className="text-left p-2">{l('보상 (예시)', 'Phần thưởng (ví dụ)', 'Reward (Example)')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {milestones.map((m, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="p-2 font-semibold text-yellow-400">{m.amount}</td>
                        <td className="p-2 text-muted-foreground">{m.reward}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground italic">
                {l('출처: ldshop.gg — 시즌별 변동 가능', 'Nguồn: ldshop.gg — có thể thay đổi theo mùa', 'Source: ldshop.gg — may vary by season')}
              </p>
              <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 text-sm">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  {l(
                    '실제 보상은 인게임 및 스토어에서 반드시 확인하세요.',
                    'Hãy kiểm tra phần thưởng thực tế trong game và cửa hàng.',
                    'Always verify actual rewards in-game and on the store.'
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* (9) Payment Methods */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-highlight" />
            {l('결제 수단', 'Phương thức thanh toán', 'Payment Methods')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-2 text-sm text-muted-foreground">
              <p>{l(
                '지원 결제 수단: Visa, Mastercard, PayPal, 편의점 결제 등',
                'Phương thức hỗ trợ: Visa, Mastercard, PayPal, thanh toán cửa hàng tiện lợi, v.v.',
                'Supported methods: Visa, Mastercard, PayPal, convenience store payment, etc.'
              )}</p>
              <p className="text-yellow-400">
                {l(
                  '결제 수단은 지역에 따라 다를 수 있으며, store.last-z.com에서 확인하세요.',
                  'Phương thức thanh toán có thể khác nhau tùy khu vực. Kiểm tra tại store.last-z.com.',
                  'Available payment methods may vary by region. Check store.last-z.com for details.'
                )}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* (10) Third-Party Platforms */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('서드파티 충전 플랫폼', 'Nền tảng nạp bên thứ ba', 'Third-Party Top-Up Platforms')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {thirdPartyPlatforms.map((platform, idx) => (
              <a
                key={idx}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:border-highlight/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ExternalLink className="h-5 w-5 text-highlight shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{platform.title}</p>
                      <p className="text-sm text-muted-foreground">{platform.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          <div className="flex gap-2 p-3 rounded-lg bg-yellow-500/10 text-sm">
            <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              {l(
                '서드파티 플랫폼은 공식 스토어가 아닙니다. 이용 시 본인 판단 하에 진행하세요.',
                'Các nền tảng bên thứ ba không phải cửa hàng chính thức. Hãy tự cân nhắc khi sử dụng.',
                'Third-party platforms are not the official store. Use at your own discretion.'
              )}
            </p>
          </div>
        </section>

        {/* (11) Store CTA - Bottom */}
        <StoreCTA l={l} />

        {/* (12) Tips & Warnings */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('꿀팁 & 주의사항', 'Mẹo & Lưu ý', 'Tips & Warnings')}</h2>

          {/* Tips */}
          <div className="space-y-3">
            {[
              l(
                '리차지 이벤트 기간에 충전하면 마일스톤 보상을 추가로 받을 수 있다',
                'Nạp trong sự kiện Recharge sẽ nhận thêm phần thưởng mốc nạp',
                'Recharging during Recharge Events earns additional milestone rewards'
              ),
              l(
                '소액 여러 번보다 한 번에 큰 금액을 충전하는 게 보너스 비율이 높다',
                'Nạp một lần lớn sẽ có tỷ lệ bonus cao hơn nhiều lần nhỏ',
                'A single large recharge gives a better bonus rate than multiple small ones'
              ),
              l(
                '서드파티 플랫폼에서 할인된 가격으로 충전할 수도 있다',
                'Có thể nạp giá ưu đãi qua các nền tảng bên thứ ba',
                'Third-party platforms may offer discounted top-up prices'
              ),
            ].map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>

          {/* Warnings */}
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
                <div>
                  <p className="font-semibold text-destructive mb-2">
                    {l('주의사항', 'Lưu ý quan trọng', 'Important Warnings')}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      {l(
                        '충전 전 반드시 본인 UID를 확인하세요 — 골드바는 UID 간 이전이 불가능합니다',
                        'Kiểm tra UID trước khi nạp — Gold Bar không thể chuyển giữa các UID',
                        'Always verify your UID before recharging — Gold Bars cannot be transferred between UIDs'
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      {l(
                        '결제 후 환불이 불가능합니다',
                        'Không thể hoàn tiền sau khi thanh toán',
                        'Payments are non-refundable'
                      )}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      {l(
                        '비공식/사기 사이트에 주의하세요 — 공식 URL은 store.last-z.com입니다',
                        'Cẩn thận với các trang web giả mạo — URL chính thức là store.last-z.com',
                        'Beware of unofficial/scam sites — the official URL is store.last-z.com'
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
