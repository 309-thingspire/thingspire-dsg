'use client';

import React, { useState } from 'react';

import { border, colors, radius, spacing, typography } from '../../style-tokens';
import { Button } from '../Button/Button';

import { Modal } from './Modal';
import type { ModalProps, ModalType } from './Modal.types';

const textBase = colors.semantic.theme.text.base;

// Figma node 2534:54220 — type, label, frame height.
const TYPES: Array<{ type: ModalType; label: string; height: number }> = [
  { type: 'info', label: 'Info', height: 214 },
  { type: 'payment', label: 'Payment', height: 382 },
  { type: 'login', label: 'Log in', height: 442 },
  { type: 'inviteFriend', label: 'Invite a Friend', height: 498 },
  { type: 'update', label: 'Update', height: 510 },
  { type: 'slot', label: 'Slot', height: 328 },
];

const captionStyle = {
  margin: spacing.scale['0'],
  fontFamily: typography.scale.captionM.medium.fontFamily,
  fontSize: typography.scale.captionM.medium.fontSize,
  fontWeight: typography.scale.captionM.medium.fontWeight,
  lineHeight: `${typography.scale.captionM.medium.lineHeight}px`,
  color: textBase.secondary,
};

const sectionTitleStyle = {
  margin: spacing.scale['0'],
  fontFamily: typography.scale.bodyS.medium.fontFamily,
  fontSize: typography.scale.bodyS.medium.fontSize,
  fontWeight: typography.scale.bodyS.medium.fontWeight,
  lineHeight: `${typography.scale.bodyS.medium.lineHeight}px`,
};

function modalPropsFor(type: ModalType): ModalProps {
  return type === 'info' ? { type: 'info' } : ({ type } as ModalProps);
}

export default function ModalPreviewPage() {
  const [openType, setOpenType] = useState<ModalType | null>(null);
  const [showDisclosureButton, setShowDisclosureButton] = useState(true);
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: colors.semantic.theme.background.surface.neutral,
        color: textBase.primary,
        padding: spacing.scale['24'],
        fontFamily: typography.scale.bodyM.medium.fontFamily,
      }}
    >
      <section style={{ maxWidth: spacing.scale['1440'], marginInline: 'auto', display: 'grid', gap: spacing.scale['24'] }}>
        <header style={{ display: 'grid', gap: spacing.scale['8'] }}>
          <h1
            style={{
              margin: spacing.scale['0'],
              fontFamily: typography.scale.h3.bold.fontFamily,
              fontSize: typography.scale.h3.bold.fontSize,
              fontWeight: typography.scale.h3.bold.fontWeight,
              lineHeight: `${typography.scale.h3.bold.lineHeight}px`,
            }}
          >
            Modal Preview
          </h1>
          <p style={{ ...captionStyle }}>Figma node 2534:54220 — 6 types. Open buttons show the real overlay dialog.</p>
        </header>

        <div style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.scale['16'], alignItems: 'center' }}>
            <label>
              <input
                type="checkbox"
                checked={showDisclosureButton}
                onChange={(event) => setShowDisclosureButton(event.target.checked)}
              />{' '}
              Show disclosure button
            </label>
            <label>
              <input
                type="checkbox"
                checked={closeOnOverlayClick}
                onChange={(event) => setCloseOnOverlayClick(event.target.checked)}
              />{' '}
              Close on overlay click
            </label>
            <label>
              <input type="checkbox" checked={closeOnEscape} onChange={(event) => setCloseOnEscape(event.target.checked)} />{' '}
              Close on Esc
            </label>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing.scale['8'] }}>
            {TYPES.map(({ type, label }) => (
              <Button key={type} variant="secondary" size="sm" onClick={() => setOpenType(type)}>
                Open {label}
              </Button>
            ))}
            <Button variant="primary" size="sm" onClick={() => setConfirmOpen(true)}>
              Open custom (Korean)
            </Button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, minmax(${spacing.scale['360']}px, 1fr))`,
            gap: spacing.scale['24'],
            alignItems: 'start',
          }}
        >
          {TYPES.map(({ type, label, height }) => (
            <div key={type} style={{ display: 'grid', gap: spacing.scale['8'], justifyItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Modal {...modalPropsFor(type)} inline showDisclosureButton={showDisclosureButton} />
              </div>
              <span style={captionStyle}>
                Type={label} · Figma {height}px
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: spacing.scale['12'] }}>
          <h2 style={sectionTitleStyle}>Composition examples</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(${spacing.scale['360']}px, 1fr))`,
              gap: spacing.scale['24'],
              alignItems: 'start',
            }}
          >
            <div style={{ display: 'grid', gap: spacing.scale['8'], justifyItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Modal
                  inline
                  headline="변경사항을 저장할까요?"
                  description="저장하지 않고 나가면 작성한 내용이 사라집니다."
                  primaryAction={{ label: '저장' }}
                  secondaryAction={{ label: '취소' }}
                  closeButtonLabel="닫기"
                />
              </div>
              <span style={captionStyle}>info · Korean copy</span>
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['8'], justifyItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Modal inline headline="알림" description={null} secondaryAction={null} primaryAction={{ label: '확인' }} />
              </div>
              <span style={captionStyle}>info · description={'{null}'} · secondaryAction={'{null}'}</span>
            </div>
            <div style={{ display: 'grid', gap: spacing.scale['8'], justifyItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Modal inline type="slot" aria-label="Custom slot">
                  <div
                    style={{
                      display: 'grid',
                      gap: spacing.scale['8'],
                      padding: spacing.scale['16'],
                      borderStyle: 'solid',
                      borderWidth: border.width['1'],
                      borderColor: colors.semantic.theme.border.base.divider,
                      borderRadius: radius.scale.xl,
                    }}
                  >
                    <span style={sectionTitleStyle}>Custom content</span>
                    <span style={captionStyle}>Children replace the Slot placeholder.</span>
                  </div>
                </Modal>
              </div>
              <span style={captionStyle}>slot · children</span>
            </div>
          </div>
        </div>
      </section>

      {openType ? (
        <Modal
          {...modalPropsFor(openType)}
          open
          onOpenChange={(next) => {
            if (!next) setOpenType(null);
          }}
          showDisclosureButton={showDisclosureButton}
          closeOnOverlayClick={closeOnOverlayClick}
          closeOnEscape={closeOnEscape}
          aria-label={openType === 'slot' ? 'Slot modal' : undefined}
        />
      ) : null}

      <Modal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        headline="변경사항을 저장할까요?"
        description="저장하지 않고 나가면 작성한 내용이 사라집니다."
        primaryAction={{ label: '저장', onClick: () => setConfirmOpen(false) }}
        secondaryAction={{ label: '취소', onClick: () => setConfirmOpen(false) }}
        closeButtonLabel="닫기"
        showDisclosureButton={showDisclosureButton}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
      />
    </main>
  );
}
