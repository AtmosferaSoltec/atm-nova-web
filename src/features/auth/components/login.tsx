import { useState, type FormEvent, type ReactElement } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  Check,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import {
  BrandIdentity,
  DeveloperCredit,
} from "../../../components/common/brand";
import { roleLabels } from "../../../config/brand";
import { demoPassword, demoUsers } from "../mocks/users";
import type { LoginProps } from "../types/auth.types";
export function Login({ brand, onLogin }: LoginProps): ReactElement {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const user = demoUsers.find((item) => item.dni === dni);
    if (!user || password !== demoPassword) {
      setError(
        "DNI o contraseña incorrectos. Prueba con una cuenta de demostración.",
      );
      return;
    }
    onLogin(user);
  }
  return (
    <main className="login-page">
      <section className="login-story">
        <BrandIdentity brand={brand} />
        <div className="story-copy">
          <span className="eyebrow">
            <span className="status-dot" /> UN NUEVO ESPACIO PARA TU CONSULTORIO
          </span>
          <h1>
            Más tiempo para
            <br />
            cuidar.
            <br />
            <em>Menos para gestionar.</em>
          </h1>
          <p>
            Tu agenda, tus pacientes y cada detalle de su atención. Todo en un
            lugar, a tu ritmo.
          </p>
          <div className="story-preview">
            <Card className="preview-appointment">
              <div className="preview-header">
                <span className="icon-tile">
                  <CalendarDays size={20} />
                </span>
                <span>
                  Tu próximo paciente
                  <small>Martes, 27 de octubre · 09:30</small>
                </span>
                <span className="badge">Confirmada</span>
              </div>
              <div className="preview-person">
                <span className="avatar">MR</span>
                <div>
                  <strong>Mariana Rojas</strong>
                  <small>Evaluación y limpieza dental</small>
                </div>
                <ArrowRight size={19} />
              </div>
              <div className="preview-footer">
                <span>
                  <Check size={14} /> Todo listo para su atención
                </span>
                <span>30 min</span>
              </div>
            </Card>
            <span className="floating-note">
              <Sparkles size={16} /> Cada sonrisa empieza con un buen cuidado.
            </span>
          </div>
        </div>
        <div className="story-bottom">
          <span>Diseñado alrededor de las personas.</span>
          <span>01 — ODONTOLOGÍA</span>
        </div>
      </section>
      <section className="login-panel">
        <span className="demo-pill">ENTORNO DE DEMOSTRACIÓN</span>
        <div className="login-form-wrap">
          <span className="welcome-icon">
            <ShieldCheck size={25} />
          </span>
          <h2>Qué bueno verte.</h2>
          <p>Ingresa a tu espacio de trabajo.</p>
          <form onSubmit={submit} className="login-form">
            <Input
              label="DNI"
              placeholder="Ingresa tus 8 dígitos"
              inputMode="numeric"
              autoComplete="username"
              pattern="[0-9]{8}"
              maxLength={8}
              required
              value={dni}
              onChange={(event) => {
                setDni(event.target.value.replace(/\D/g, ""));
                setError("");
              }}
            />
            <div className="password-wrap">
              <Input
                label="Contraseña"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                type={visible ? "text" : "password"}
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
              />
              <Button
                variant="ghost"
                className="password-toggle"
                aria-label={
                  visible ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="login-submit">
              Ingresar <ArrowRight size={18} />
            </Button>
          </form>
          <div className="demo-divider">
            <span>EXPLORA CON UN PERFIL</span>
          </div>
          <div className="role-grid">
            {demoUsers.map((user) => (
              <Button
                key={user.id}
                variant="secondary"
                onClick={() => onLogin(user)}
              >
                {roleLabels[user.role]}
                <ArrowRight size={14} />
              </Button>
            ))}
          </div>
          <p className="demo-help">
            Accesos directos con datos ficticios.
            <br />
            DNI de prueba: 10000006 · Clave: {demoPassword}
          </p>
        </div>
        <DeveloperCredit />
      </section>
    </main>
  );
}
