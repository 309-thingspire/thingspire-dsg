# Modal

오버레이 위에 뜨는 다이얼로그 (400 wide). Figma `Modal` (node 2534:54220, carbonscope-Library v1.0)의 6개 타입을 그대로 옮겼습니다.

위계: **organism** — `TabMenu`·`Pagination`(molecule)을 포함하므로 molecule이 될 수 없습니다.

## Types

| `type` | Figma | 높이 (Figma) | 구성 |
|---|---|---|---|
| `info` (기본) | Type=Info | 214 | headline + description + primary / secondary 버튼 (세로) |
| `payment` | Type=Payment | 382 | + 플랜 토글(segmented) + 카드 / 이메일 필드 + primary |
| `login` | Type=Log in | 442 | + 아이디 / 비밀번호 필드 + primary + 구분선 + 소셜 버튼 + 링크 2줄 |
| `inviteFriend` | Type=Invite a Friend | 498 | + 초대 입력(버튼 붙은 Input) + 초대 목록 + 공유 버튼 |
| `update` | Type=Update | 510 | + 이미지 영역(312) + 페이지 표시 |
| `slot` | Type=Slot | 328 | `children` (없으면 Slot 플레이스홀더) |

## Props

### 공통
- `open` / `defaultOpen` / `onOpenChange` — Dropdown·SelectInput과 같은 규칙. 닫기 버튼·Esc·오버레이 클릭은 `onOpenChange(false)`를 호출합니다.
- `inline` — 오버레이·포털·포커스 트랩·스크롤 잠금 없이 패널만 제자리에 렌더하고 항상 보입니다. 문서·갤러리나 직접 만든 오버레이 안에 넣을 때 씁니다.
- `showDisclosureButton` (기본 `true`) — 우상단 닫기(X). Figma 속성 이름 그대로입니다.
- `closeButtonLabel` (기본 `'Close'`), `closeOnEscape`, `closeOnOverlayClick` (기본 `true`)
- `width` (기본 400, 최대 폭), `portalTarget` (기본 `document.body`), `id`, `className`, `style`(패널)
- `aria-label` / `aria-labelledby` / `aria-describedby` — `slot` 타입은 제목이 없으므로 `aria-label`을 넘기세요.

### 텍스트 (slot 제외)
- `headline`, `description` — 미지정 시 Figma 샘플 문구. `description={null}`이면 숨깁니다.

### 타입별
- `info`: `primaryAction`, `secondaryAction`
- `payment`: `plans` (`{ id, label, badge? }[]`, `[]`이면 토글 숨김), `selectedPlanId` / `defaultSelectedPlanId` / `onSelectedPlanIdChange`, `cardField`, `emailField`, `primaryAction`
- `login`: `usernameField`, `passwordField`, `primaryAction`, `dividerLabel`, `socialActions`, `forgotPasswordAction`, `signUpPrompt`, `signUpAction`, `showPasswordLabel`, `hidePasswordLabel`
- `inviteFriend`: `inviteField` (+ `buttonLabel`, `onButtonClick`), `invitedFriendsLabel` (기본 `Invited friends [n]`), `invitedFriends` (`{ name, email, avatarSrc?, rewardLabel? }[]`), `shareActions`
- `update`: `imageSlot`, `showPagination`, `dotCount` (기본 6), `activeDotIndex` / `defaultActiveDotIndex` / `onActiveDotIndexChange`
- `slot`: `children`

### 값 규칙
- 버튼 액션(`ModalAction`)은 `{ label, onClick, disabled, htmlType, leftIcon, rightIcon, … }` — 공용 `Button`(size `sm`)에 그대로 전달됩니다. variant는 자리로 정해집니다 (primary / secondary / 소셜 secondary / 공유 tertiary).
- 링크 액션(`ModalLinkAction`)은 `href`가 있으면 `<a>`, `onClick`만 있으면 `<button>`, 둘 다 없으면 텍스트로 렌더합니다.
- 필드(`ModalField`)는 `{ label, placeholder, value, defaultValue, onValueChange, disabled }`. 넘긴 키만 덮어쓰고 나머지는 Figma 샘플을 유지합니다.
- **미지정(`undefined`)은 Figma 샘플, `null`은 숨김**입니다. 예: `secondaryAction={null}`, `dividerLabel={null}`, `socialActions={null}`.

## Behavior
- 열리면 패널(`tabIndex=-1`)에 포커스, 닫히면 열기 전 요소로 포커스를 돌려줍니다.
- Tab / Shift+Tab은 패널 안에서 순환합니다. 모달이 겹치면 가장 위 모달만 Esc·Tab에 반응합니다.
- 열린 동안 `body` 스크롤을 잠그고, 사라진 스크롤바 폭만큼 `padding-right`를 보정합니다.
- 오버레이 클릭은 누르기와 떼기가 모두 패널 밖일 때만 닫습니다 (패널 안에서 드래그해 밖에서 놓으면 유지).
- 화면보다 길면 오버레이 안에서 스크롤됩니다 (위아래 24 여백).
- `payment` / `login` 필드는 `<form noValidate>` 안에 있어 Enter가 primary 버튼(기본 `htmlType: 'submit'`)을 실행합니다. 페이지 제출은 막습니다.
- 비밀번호 필드는 `htmlType="password"`로 가려지고, 눈 아이콘 버튼으로 보기/숨기기를 전환합니다.
- `update`의 이전/다음은 0 ~ `dotCount - 1` 사이에서 멈춥니다.
- SSR: 열린 오버레이는 마운트 후 포털로 렌더합니다. `inline`은 서버에서도 렌더합니다.

## Accessibility
- `role="dialog"` + `aria-modal="true"`, `aria-labelledby` → headline, `aria-describedby` → description
- 닫기 버튼 `aria-label` (`closeButtonLabel`), 비밀번호 토글 `aria-label` (`showPasswordLabel` / `hidePasswordLabel`)
- `update`의 이전 / 다음 버튼 이름은 Pagination 기본값 (`Previous page` / `Next page`)
- 키보드 포커스에만 focus ring (`shadows.focusRing.light`)
- 초대 목록은 `<ul role="list">`
- 대비 (WCAG AA 4.5:1): 다크 모드는 모든 조합 통과. 라이트 모드는 Figma가 지정한 두 색이 미달 — `text.base.tertiary`(초대 이메일, placeholder) 2.61:1, `text.status.success`(보상 금액) 2.45:1. 나머지(primary 18.2, secondary 4.8, 라임 위 잉크 11.4, Slot 8.2)는 통과.

## Composition deps
- `TextContainer` (size `xs`, caption 숨김) — headline / description
- `Button` (size `sm`) — 모든 버튼
- `Input` (size `xs`) — 필드, `type="button"` 초대 입력, `htmlType` (password / email)
- `TabMenu` (type `segmented`, size `sm`) — 플랜 토글
- `Pagination` (type `arrows`, size `sm`, dots) — update
- 아이콘 (Figma SVG와 픽셀 대조로 확인): `IconCloseLine`, `IconBankCard2Line`, `IconMailLine`, `IconEyeLine` / `IconEyeOffLine`, `IconGoogleFill`, `IconAppleFill`, `IconLinkM`, `IconTwitterFill`, `IconUser2Line`(아바타 기본)
- 모달 전용 조각: 닫기 버튼(24 원형), 라벨 구분선, 초대 행(아바타 40), Slot 플레이스홀더

## Token Usage

### Background
- `colors.semantic.theme.background.surface.default` (패널)
- `colors.semantic.theme.background.overlay.custom` (오버레이)
- `colors.semantic.theme.background.button.tertiary` / `tertiaryHover` (닫기 버튼)
- `colors.semantic.theme.background.button.ghost` (비밀번호 토글, 링크)
- `colors.semantic.theme.background.badge.purple` (아바타 기본)
- `colors.semantic.theme.semantic.brand.2` (Slot 플레이스홀더)
- `colors.gradients.solid.04` (update 이미지 영역)

### Text / Icon
- `colors.semantic.theme.text.base.primary` / `secondary` / `tertiary`
- `colors.semantic.theme.text.status.success` (보상 금액)
- `colors.semantic.theme.text.accent.purple` (아바타 기본 아이콘)
- `colors.semantic.theme.semantic.brand.11` (Slot 글자)
- `colors.semantic.theme.icon.base.secondary` (닫기, 버튼 아이콘) / `tertiary` (필드 아이콘)

### Border / Shadow
- `colors.semantic.theme.border.action.normal` (패널)
- `colors.semantic.theme.border.base.divider` (구분선)
- `colors.semantic.theme.semantic.brand.8` (Slot 점선)
- `border.width.0`, `border.width.1`
- `shadows.elevation.lg` (패널 — Figma `Shadows/lg`), `shadows.focusRing.light`

### Layout
- `spacing.scale.400` (패널 폭), `spacing.scale.24` (gap, 오버레이 여백), `spacing.scale.24 - border.width.1` (패널 패딩: Figma inside stroke 보정 → 내용 폭 352)
- `spacing.scale.16 - border.width.1` (닫기 버튼 위치: 바깥 모서리에서 16)
- `spacing.scale.288 - spacing.scale.8` (Slot 280), `spacing.scale.320 - spacing.scale.8` (update 이미지 312) — FeatureCard와 같은 방식
- `spacing.scale.0` / `1` / `2` / `5` / `8` / `12` / `14` / `16` / `20` / `40`
- `radius.scale.xxl` (패널, 이미지), `radius.scale.xl` (Slot), `radius.scale.full` (닫기, 아바타), `radius.scale.xs` (토글 포커스)

### Typography
- `typography.scale.captionL.regular` / `captionL.medium`, `typography.scale.captionM.medium` (구분선 라벨), `typography.scale.h6.medium` (Slot) — headline / description은 `TextContainer` xs

## Figma 대비 차이

의도한 차이 (현재 DSG 기준을 따름)
- primary 버튼이 라임 — Button의 브랜드 변경(#73E63D)을 따름 (Figma는 검정)
- update 이미지와 Slot 플레이스홀더가 라임 계열 — FeatureCard와 같이 `gradients.solid.04`, `semantic.brand.2/8/11` 사용 (Figma는 분홍 / 보라)
- 초대 목록 아바타는 데이터(`avatarSrc`)로 받음. 기본값은 아바타 아이콘 (Figma 샘플 이미지는 넣지 않음)
- Payment 이메일 라벨 `Email Adress` → `Email Address` (Figma 오타)
- 패널 `overflow`는 잘라내지 않음 — slot 안의 Dropdown 메뉴 등이 잘리지 않도록

하위 컴포넌트에서 물려받은 차이 (Modal 밖에서 고칠 항목)
- Input / TabMenu는 테두리가 바깥에 더해져 Figma보다 2px씩 큽니다 → payment 388 (Figma 382), login 446 (442), invite 500 (498). info 214, update 510, slot 328은 Figma와 같습니다.

## Usage

```tsx
import { useState } from 'react';
import { Button } from '@/components/button/button';
import { Modal } from '@/components/modal/modal';

export function SaveConfirm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>저장</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        headline="변경사항을 저장할까요?"
        description="저장하지 않고 나가면 작성한 내용이 사라집니다."
        primaryAction={{ label: '저장', onClick: () => setOpen(false) }}
        secondaryAction={{ label: '취소', onClick: () => setOpen(false) }}
        closeButtonLabel="닫기"
      />
    </>
  );
}

// 자유 콘텐츠
<Modal type="slot" open={open} onOpenChange={setOpen} aria-label="필터">
  <FilterForm />
</Modal>
```
