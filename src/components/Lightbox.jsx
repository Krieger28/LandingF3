import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Picture from './Picture.jsx'
import { useLang } from '../i18n/index.jsx'

const MIN_ZOOM = 1
const MAX_ZOOM = 5
const NO_ZOOM = { s: 1, x: 0, y: 0 }

/**
 * Visor de fotos a pantalla completa (usa <dialog> nativo: Escape y foco incluidos).
 * Se cierra con la X, tocando fuera de la imagen o con Escape.
 * Flechas / teclado / swipe para pasar de foto; rueda del mouse para hacer zoom
 * (hacia donde apunta el cursor) y arrastrar para moverse por la foto ampliada.
 * `onClose(index)` devuelve la última foto vista.
 */
export default function Lightbox({ images, name, start = 0, onClose }) {
  const { t } = useLang()
  const dialogRef = useRef(null)
  const stageRef = useRef(null)
  const touchX = useRef(null)
  const drag = useRef(null) // { id, startX, startY, x, y, moved }
  const justDragged = useRef(false)
  const [index, setIndex] = useState(start)
  const [zoom, setZoom] = useState(NO_ZOOM)
  const [dragging, setDragging] = useState(false)
  const count = images.length
  const zoomed = zoom.s > 1

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  // Zoom con la rueda. Listener nativo porque React registra `wheel` como pasivo
  // y necesitamos preventDefault (también cubre el pinch del trackpad, que llega con ctrlKey).
  useEffect(() => {
    const dialog = dialogRef.current
    const onWheel = (e) => {
      e.preventDefault()
      const stage = stageRef.current
      if (!stage) return
      // Centro "sin transformar" de la foto (offset* ignora el transform; el dialog ocupa
      // toda la pantalla desde 0,0) y punto bajo el cursor relativo a ese centro.
      const cx = dialog.getBoundingClientRect().left + stage.offsetLeft + stage.offsetWidth / 2
      const cy = dialog.getBoundingClientRect().top + stage.offsetTop + stage.offsetHeight / 2
      const px = e.clientX - cx
      const py = e.clientY - cy
      setZoom((z) => {
        const s = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z.s * Math.exp(-e.deltaY * 0.0015)))
        if (s === MIN_ZOOM) return NO_ZOOM
        // Mantener fijo bajo el cursor el mismo punto de la foto.
        const k = s / z.s
        return { s, x: px - k * (px - z.x), y: py - k * (py - z.y) }
      })
    }
    dialog.addEventListener('wheel', onWheel, { passive: false })
    return () => dialog.removeEventListener('wheel', onWheel)
  }, [])

  const close = () => dialogRef.current?.close()
  const go = (dir) => {
    setZoom(NO_ZOOM)
    setIndex((i) => (i + dir + count) % count)
  }

  const onKeyDown = (e) => {
    if (count < 2) return
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  // Swipe para cambiar de foto (solo sin zoom, para no pelear con el arrastre).
  const onTouchStart = (e) => { touchX.current = zoomed ? null : e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null || count < 2) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  // Arrastrar la foto ampliada.
  const onPointerDown = (e) => {
    if (!zoomed || e.button !== 0 || !e.target.closest('img')) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, startX: e.clientX, startY: e.clientY, x: zoom.x, y: zoom.y, moved: false }
    setDragging(true)
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true
    setZoom((z) => ({ ...z, x: d.x + dx, y: d.y + dy }))
  }
  const onPointerUp = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    justDragged.current = d.moved // el click que sigue a un arrastre no debe cerrar el visor
    drag.current = null
    setDragging(false)
  }

  const onClick = (e) => {
    if (justDragged.current) { justDragged.current = false; return }
    // Cualquier toque que no sea sobre la foto o un botón cierra el visor.
    if (!e.target.closest('img, button')) close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={t.cabins.photosOf(name)}
      onClose={() => onClose(index)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
      <div
        ref={stageRef}
        className={`lightbox-stage ${zoomed ? 'is-zoomed' : ''} ${dragging ? 'is-dragging' : ''}`}
        style={{ transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.s})` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Picture
          key={images[index].img.src}
          pic={images[index]}
          alt={t.cabins.photoCaption(name, index + 1, count)}
          sizes="100vw"
          priority
          className="lightbox-pic"
        />
      </div>

      <button className="lightbox-btn lightbox-close" onClick={close} aria-label={t.common.close} autoFocus>
        <X size={24} />
      </button>

      {count > 1 && (
        <>
          <button className="lightbox-btn lightbox-nav prev" onClick={() => go(-1)} aria-label={t.common.prevPhoto}>
            <ChevronLeft size={26} />
          </button>
          <button className="lightbox-btn lightbox-nav next" onClick={() => go(1)} aria-label={t.common.nextPhoto}>
            <ChevronRight size={26} />
          </button>
          <div className="lightbox-count" aria-live="polite">{index + 1} / {count}</div>
        </>
      )}
    </dialog>
  )
}
