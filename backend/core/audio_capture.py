import threading
import wave
from queue import Queue

try:
    import sounddevice as sd
except Exception:  # pragma: no cover - runtime/platform dependent import
    sd = None

from config.settings import AUDIO_CHANNELS, AUDIO_CHUNK_SIZE, AUDIO_SAMPLE_RATE


class AudioCapture:
    """Real-time microphone capture using sounddevice."""

    def __init__(self, audio_queue: Queue):
        """
        Args:
            audio_queue: Thread-safe queue.Queue used to publish raw audio chunks.
        """
        self.audio_queue = audio_queue
        self.frames = []

        self._stream = None
        self._stop_event = threading.Event()
        self._frames_lock = threading.Lock()
        self._is_available = sd is not None

        if not self._is_available:
            print("[AudioCapture] sounddevice is not installed. Live recording is unavailable on this environment.")

    def start_recording(self) -> None:
        """Open the microphone stream and start callback-based recording."""
        if not self._is_available:
            print("[AudioCapture] Cannot start recording: sounddevice is unavailable.")
            return

        if self._stream is not None:
            print("[AudioCapture] Recording is already running.")
            return

        self._stop_event.clear()

        def _on_audio_chunk(indata, frames, time_info, status) -> None:
            if status:
                print(f"[AudioCapture] Stream status: {status}")
            if self._stop_event.is_set():
                return
            chunk = indata.copy().tobytes()
            self.audio_queue.put(chunk)
            with self._frames_lock:
                self.frames.append(chunk)

        try:
            self._stream = sd.InputStream(
                channels=AUDIO_CHANNELS,
                samplerate=AUDIO_SAMPLE_RATE,
                blocksize=AUDIO_CHUNK_SIZE,
                dtype="int16",
                callback=_on_audio_chunk,
            )
            self._stream.start()
        except Exception as exc:
            print(f"[AudioCapture] Failed to open audio stream: {exc}")
            self._cleanup_stream()
            return

    def stop_recording(self) -> None:
        """Signal recording thread to stop and close stream resources."""
        self._stop_event.set()

        self._cleanup_stream()

    def save_wav(self, filepath: str) -> None:
        """Save all captured frames to a WAV file."""
        try:
            sample_width = 2

            with self._frames_lock:
                frames_data = b"".join(self.frames)

            with wave.open(filepath, "wb") as wav_file:
                wav_file.setnchannels(AUDIO_CHANNELS)
                wav_file.setsampwidth(sample_width)
                wav_file.setframerate(AUDIO_SAMPLE_RATE)
                wav_file.writeframes(frames_data)
        except Exception as exc:
            print(f"[AudioCapture] Failed to save WAV to '{filepath}': {exc}")

    def _cleanup_stream(self) -> None:
        """Close sounddevice stream safely."""
        if self._stream is not None:
            try:
                if self._stream.active:
                    self._stream.stop()
            except Exception as exc:
                print(f"[AudioCapture] Error stopping stream: {exc}")
            try:
                self._stream.close()
            except Exception as exc:
                print(f"[AudioCapture] Error closing stream: {exc}")
            finally:
                self._stream = None
