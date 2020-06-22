import classNames from 'classnames';
import { PlayerRole } from 'core/player/player_props';
import * as React from 'react';
import lordMask from './images/lord.png';
import loyalistMask from './images/loyalist.png';
import rebelMask from './images/rebel.png';
import renegadeMask from './images/renegade.png';
import unknownMask from './images/unknown.png';
import styles from './mask.module.css';

const maskImages: { [K in PlayerRole]: string } = {
  [PlayerRole.Lord]: lordMask,
  [PlayerRole.Rebel]: rebelMask,
  [PlayerRole.Loyalist]: loyalistMask,
  [PlayerRole.Renegade]: renegadeMask,
  [PlayerRole.Unknown]: unknownMask,
};

export type MaskProps = {
  displayedRole?: PlayerRole;
  disabled?: boolean;
  className?: string;
  lockedRole?: PlayerRole;
};

const OneMask = (props: { role: PlayerRole; onClick?(role: PlayerRole): () => void; className?: string }) => {
  const { role, onClick, className } = props;
  return (
    <div
      className={classNames(styles.oneMask, className, {
        [styles.lord]: role === PlayerRole.Lord,
        [styles.loyalist]: role === PlayerRole.Loyalist,
        [styles.rebel]: role === PlayerRole.Rebel,
        [styles.renegade]: role === PlayerRole.Renegade,
        [styles.unknown]: role === PlayerRole.Unknown,
      })}
      onClick={onClick && onClick(role)}
    >
      <img className={styles.maskImage} alt={''} src={maskImages[role]} />
    </div>
  );
};

const AllMasks = (props: { onClick?(role: PlayerRole): () => void; opened: boolean }) => {
  const { onClick, opened } = props;

  const masks: JSX.Element[] = [];
  for (const role of [PlayerRole.Loyalist, PlayerRole.Rebel, PlayerRole.Renegade, PlayerRole.Unknown]) {
    masks.push(
      <OneMask
        role={role}
        key={role}
        onClick={onClick}
        className={classNames({
          [styles.opened]: opened,
        })}
      />,
    );
  }

  return <>{masks}</>;
};

export const Mask = (props: MaskProps) => {
  const { disabled, displayedRole = PlayerRole.Unknown, className, lockedRole } = props;
  const [maskSwitch, setMaskSwitch] = React.useState(false);
  const [role, setRole] = React.useState(displayedRole);

  const onClick = (role: PlayerRole) => () => {
    setRole(role);
    setMaskSwitch(false);
  };

  const onMaskClick = () => {
    if (lockedRole !== undefined) {
      return;
    }

    !disabled && setMaskSwitch(!maskSwitch);
  };

  return (
    <div className={className} onClick={onMaskClick}>
      <div
        className={classNames(styles.displayedRole, {
          [styles.lord]: lockedRole === PlayerRole.Lord || role === PlayerRole.Lord,
          [styles.loyalist]: lockedRole === PlayerRole.Loyalist || role === PlayerRole.Loyalist,
          [styles.rebel]: lockedRole === PlayerRole.Rebel || role === PlayerRole.Rebel,
          [styles.renegade]: lockedRole === PlayerRole.Renegade || role === PlayerRole.Renegade,
        })}
      >
        <img className={styles.maskImage} alt={''} src={maskImages[lockedRole || role]} />
      </div>
      <AllMasks onClick={disabled ? undefined : onClick} opened={maskSwitch} />
    </div>
  );
};
