import React, { useState } from 'react';

import { colors, spacing, typography } from '../../style-tokens';

import { User } from './User';

export default function UserPreviewPage() {
  const [proBadge, setProBadge] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [showAvatar, setShowAvatar] = useState(true);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: colors.primitive.palette.base.white,
        padding: spacing.scale['24'],
        fontFamily: typography.scale.bodyM.medium.fontFamily,
      }}
    >
      <section
        style={{
          maxWidth: spacing.scale['1024'],
          marginInline: 'auto',
          display: 'grid',
          gap: spacing.scale['24'],
        }}
      >
        <header style={{ display: 'grid', gap: spacing.scale['8'] }}>
          <h1
            style={{
              margin: 0,
              fontFamily: typography.scale.h3.bold.fontFamily,
              fontSize: typography.scale.h3.bold.fontSize,
              fontWeight: typography.scale.h3.bold.fontWeight,
              lineHeight: `${typography.scale.h3.bold.lineHeight}px`,
            }}
          >
            User Preview
          </h1>
          <p style={{ margin: 0, color: colors.primitive.palette.gray['9a'] }}>
            사이드바 사용자 행. avatar / Pro badge / handle / 우측 액션 아이콘 토글.
          </p>
        </header>

        <div style={{ display: 'flex', gap: spacing.scale['16'], flexWrap: 'wrap' }}>
          <label><input type="checkbox" checked={proBadge} onChange={(e) => setProBadge(e.target.checked)} /> Pro Badge</label>
          <label><input type="checkbox" checked={showCaption} onChange={(e) => setShowCaption(e.target.checked)} /> Caption</label>
          <label><input type="checkbox" checked={showAvatar} onChange={(e) => setShowAvatar(e.target.checked)} /> Avatar</label>
        </div>

        <section
          style={{
            border: `1px solid ${colors.primitive.palette.gray['2']}`,
            borderRadius: spacing.scale['12'],
            padding: spacing.scale['24'],
            backgroundColor: colors.primitive.palette.base.white,
          }}
        >
          <User proBadge={proBadge} showCaption={showCaption} showAvatar={showAvatar} />
        </section>
      </section>
    </main>
  );
}
